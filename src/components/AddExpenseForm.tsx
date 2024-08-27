import { z, ZodFormattedError } from "zod";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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
import { useEffect, useMemo, useState, useTransition } from "react";
import { Friend } from "@/types/types";

export const expenseSchema = z.object({
  expenseWith: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        pfpColor: z.string(),
      })
    )
    .min(1, "There should be at least one friend"),
  amount: z.number().positive("Amount should be Greater than 0"),
  description: z.string(),
  paidBy: z
    .array(
      //it's safe to use array here because we are using already made objects which may have things unique to them
      z.object({
        id: z.string(),
        name: z.string(),
        pfpColor: z.string(),
      })
    )
    .min(1, "Paid by can't be empty"),
  expenseTime: z.date(),
});

type Expense = z.infer<typeof expenseSchema>;
type ExpenseErrors = ZodFormattedError<Expense>;
export default function AddExpenseForm({
  closeDialogue,
}: {
  closeDialogue: () => void;
}) {
  const [expense, setExpense] = useState<Expense>({
    expenseWith: [],
    amount: 0,
    description: "",
    paidBy: [],
    expenseTime: new Date(),
  });
  const [errors, setErrors] = useState<ExpenseErrors>({ _errors: [] });
  const [isSubmitting, startSubmitting] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const result = expenseSchema.safeParse(expense);
        if (result.success) {
          setErrors({ _errors: [] });
          console.log("Form submitted successfully", expense);
          // closeDialogue();
        } else {
          const formattedErrors = result.error.format();
          setErrors(formattedErrors);
          console.log("Error", formattedErrors);
        }
      }}
    >
      <div className="flex flex-col gap-2 py-2">
        <Label>With You and</Label>
        <AddExpenseWith
          expenseWith={expense.expenseWith}
          setExpenseWith={(friends: Friend[]) => {
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
            <SelectItem value="me">Me</SelectItem>
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
        <Button type="submit">Add Expense</Button>
      </div>
    </form>
  );
}

function AddExpenseWith({
  expenseWith,
  setExpenseWith,
}: {
  expenseWith: Friend[];
  setExpenseWith: (friends: Friend[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [optionsResponse, setOptionsResponse] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchFriends = async (query: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const friends: Friend[] = [
      { id: `${Math.random()}`, name: "Alice", pfpColor: getPfpColor("Alice") },
      { id: `${Math.random()}`, name: "Bob", pfpColor: getPfpColor("Bob") },
      {
        id: `${Math.random()}`,
        name: "Charlie",
        pfpColor: getPfpColor("Charlie"),
      },
      { id: `${Math.random()}`, name: "David", pfpColor: getPfpColor("David") },
      { id: `${Math.random()}`, name: "Eva", pfpColor: getPfpColor("Eva") },
      { id: `${Math.random()}`, name: "Frank", pfpColor: getPfpColor("Frank") },
      {
        id: `${Math.random()}`,
        name: "Graced",
        pfpColor: getPfpColor("Graced"),
      },
    ];
    const low = Math.floor(Math.random() * friends.length);
    const high = Math.floor(Math.random() * friends.length);
    if (low === high) return [friends[low]];
    return friends.slice(Math.min(low, high), Math.max(low, high));
  };

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
  }, [searchQuery]);

  return (
    <div className="flex flex-wrap gap-2">
      {expenseWith.map((friend) => (
        <Badge
          key={friend.id}
          variant="outline"
          className="h-9 rounded-full p-1 pl-2"
        >
          {friend.name}
          <Button
            variant="secondary"
            className="relative ml-1 flex size-6 shrink-0 items-center justify-center rounded-full p-0"
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
                {optionsResponse.map((friend: Friend) => {
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
