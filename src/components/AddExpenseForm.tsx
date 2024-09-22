import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, PlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Cross1Icon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, getPfpColor } from "@/lib/utils";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { FriendInterface } from "@/types/types";
import { generateTransactions } from "@/lib/generateTransactions";
import ProfilePic from "@/components/ProfilePic";
import TransactionsContext from "@/context/TransactionsContext";
import { localStorageKeys } from "@/lib/local-storage-keys";
import UserContext from "@/context/UserContext";
import { getFriends } from "@/app/_actions/friends";
import { createTransaction } from "@/app/_actions/transactions";
import {
  expenseSchema,
  ExpenseType,
  ExpenseErrorsType,
} from "@/schema/expenseSchema";

export default function AddExpenseForm({
  closeDialogue,
}: {
  closeDialogue: () => void;
}) {
  const [expense, setExpense] = useState<ExpenseType>({
    expenseWith: [{ id: "me", name: "Me", pfpColor: getPfpColor("Me") }],
    amount: 0,
    description: "",
    paidBy: [],
    expenseTime: new Date(),
  });
  const [errors, setErrors] = useState<ExpenseErrorsType>({ _errors: [] });
  const user = useContext(UserContext);

  const [isSubmitting, startSubmitting] = useTransition();
  const { addTransaction } = useContext(TransactionsContext);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const result = expenseSchema.safeParse(expense);
        if (result.success) {
          setErrors({ _errors: [] });
          if (!user) {
            const transactions = generateTransactions(
              { id: "me", name: "Me", pfpColor: getPfpColor("Me") },
              expense
            );
            transactions.forEach((transaction, i) => {
              if (
                transaction.borrower.id === "me" ||
                transaction.lender.id === "me"
              ) {
                addTransaction(transaction);
              }
            });
            closeDialogue();
          } else {
            startSubmitting(async () => {
              await createTransaction(expense);
              closeDialogue();
            });
          }
        } else {
          const formattedErrors = result.error.format();
          setErrors(formattedErrors);
        }
      }}
    >
      <div className="flex flex-col gap-2 py-2">
        <Label>With You and</Label>
        <AddExpenseWith
          expenseWith={expense.expenseWith}
          setExpenseWith={(friends: FriendInterface[]) => {
            setExpense((prevExpense) => ({
              ...prevExpense,
              expenseWith: friends,
            }));
          }}
        />
        {errors.expenseWith?._errors.map((error, i) => (
          <div
            className="text-sm font-medium leading-none text-destructive"
            key={i}
          >
            {error}
          </div>
        )) || ""}
      </div>
      <div className="flex flex-col gap-2 py-2">
        <Label htmlFor="amount-input">Amount</Label>
        <Input
          id="amount-input"
          value={expense.amount || ""}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setExpense((prevExpense) => ({
              ...prevExpense,
              amount: Number.isNaN(value) ? 0 : value,
            }));
          }}
        />
        {errors.amount?._errors.map((error, i) => (
          <div
            className="text-sm font-medium leading-none text-destructive"
            key={i}
          >
            {error}
          </div>
        )) || ""}
      </div>
      <div className="flex flex-col gap-2 py-2">
        <Label htmlFor="description-input">Description</Label>
        <Input
          id="description-input"
          value={expense.description}
          onChange={(e) => {
            setExpense((prevExpense) => ({
              ...prevExpense,
              description: e.target.value,
            }));
          }}
        />
        {errors.description?._errors.map((error, i) => (
          <div
            className="text-sm font-medium leading-none text-destructive"
            key={i}
          >
            {error}
          </div>
        )) || ""}
      </div>
      <div className="flex flex-wrap justify-between gap-2 py-2">
        <Label htmlFor="paidBy-input">Paid By</Label>
        <Select
          value={expense.paidBy[0]?.id || ""}
          onValueChange={(e) => {
            const paidBy = expense.expenseWith.find(
              (ew) => ew.id === e.valueOf()
            );
            setExpense((prevExpense) => ({
              ...prevExpense,
              paidBy: paidBy ? [paidBy] : [],
            }));
          }}
        >
          <SelectTrigger className="w-full" id="paidBy-input">
            <SelectValue placeholder="Paid By" />
          </SelectTrigger>
          <SelectContent>
            {expense.expenseWith.map((friend) => (
              <SelectItem key={friend.id} value={friend.id}>
                {friend.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.paidBy?._errors.map((error, i) => (
          <div
            className="text-sm font-medium leading-none text-destructive"
            key={i}
          >
            {error}
          </div>
        )) || ""}
      </div>
      <div className="flex flex-col gap-2 py-2 pb-4">
        <Label htmlFor="expense-time-input">Expense Time</Label>
        <div>{expense.expenseTime.toLocaleString()}</div>
      </div>
      <div className="flex flex-wrap justify-between gap-2 py-2">
        <Button
          variant="outline"
          className="border-destructive text-destructive"
          onClick={() => {
            // resetForm();
            closeDialogue();
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "relative",
            isSubmitting ? "text-transparent disabled:opacity-100" : ""
          )}
        >
          Add Expense
          {isSubmitting ? (
            <div className="absolute size-8 animate-spin rounded-full border-4 border-muted border-t-foreground"></div>
          ) : (
            ""
          )}
        </Button>
      </div>
    </form>
  );
}

function AddExpenseWith({
  expenseWith,
  setExpenseWith,
}: {
  expenseWith: FriendInterface[];
  setExpenseWith: (friends: FriendInterface[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [optionsResponse, setOptionsResponse] = useState<FriendInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useContext(UserContext);

  const searchFriends = useCallback(
    async (query: string) => {
      if (!user) {
        let localFriends = localStorage.getItem(localStorageKeys.friends);
        const searchedFriends = localFriends ? JSON.parse(localFriends) : [];
        return (searchedFriends || []) as FriendInterface[];
      } else {
        let response;
        try {
          response = await getFriends();
        } catch (error) {
          setError("Error loading friends.");
          return [];
        }
        return response || [];
      }
    },
    [user]
  );

  useEffect(() => {
    let fetchOptionsTimeout: NodeJS.Timeout | null = null;
    (async () => {
      setLoading(true);
      setOptionsResponse(await searchFriends(searchQuery));
      setLoading(false);
    })();
    return () => {
      if (fetchOptionsTimeout) {
        clearTimeout(fetchOptionsTimeout);
      }
    };
  }, [searchQuery, searchFriends]);

  return (
    <div className="flex flex-wrap gap-2">
      {expenseWith.map((friend) => (
        <Badge
          key={friend.id}
          variant="outline"
          className="flex h-9 items-center gap-1 rounded-full bg-secondary p-1"
        >
          <ProfilePic
            color={friend.pfpColor}
            letter={friend.name[0]}
            className="size-6 text-sm"
          />
          {friend.name}
          <Button
            disabled={friend.id === "me"}
            variant="secondary"
            className="relative flex size-6 shrink-0 items-center justify-center rounded-full p-0"
            onClick={(e) => {
              e.preventDefault();
              setExpenseWith(
                expenseWith.filter(
                  (expenseWithFriend) => expenseWithFriend.id !== friend.id
                )
              );
            }}
          >
            <Cross1Icon className="size-3/5" />
          </Button>
        </Badge>
      ))}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="size-9 rounded-full p-0">
            <PlusIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              value={searchQuery}
              onValueChange={(e) => {
                setSearchQuery(e.valueOf());
              }}
              placeholder="Search Friends..."
            />
            <CommandList>
              <CommandEmpty>
                {loading && !error ? "Loading Friends..." : ""}
                {!loading && !error && !optionsResponse.length
                  ? "No Friends found."
                  : ""}
                {error && "Error loading friends."}
              </CommandEmpty>
              <CommandGroup>
                {optionsResponse.map((friend: FriendInterface) => {
                  const isSelected = expenseWith.some(
                    (friendInExpense) => friendInExpense.id === friend.id
                  );
                  return (
                    <CommandItem
                      key={friend.id}
                      value={friend.name}
                      onSelect={() => {
                        if (isSelected) return;
                        setExpenseWith([...expenseWith, friend]);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {friend.name}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
