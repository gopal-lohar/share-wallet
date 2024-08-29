import { useContext } from "react";

import useWidth from "@/hooks/useWidth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionsContext from "@/context/TransactionsContext";
import ProfilePic from "./ProfilePic";
import { Transaction } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import UserContext from "@/context/UserContext";

export default function Transactions() {
  const windowWidth = useWidth();
  if (windowWidth && windowWidth > 640) {
    return (
      <div className="h-full min-h-[60vh] w-full rounded-lg border">
        <div className="h-full w-full">
          <div className="inline-flex h-10 w-full items-center justify-center rounded-md rounded-b-none border-b p-1">
            <div className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium">
              Borrowed
            </div>
            <div className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium">
              Lended
            </div>
          </div>
          {/* 100% - OweOwed title height - extra space at bottom to make separator look good */}
          <div className="flex h-[calc(100%-2.5rem-0.5rem)] divide-x">
            {/* 100% - margin compansation */}
            <div className="mt-2 h-[100%-0.5rem] w-full">
              <TransactionsList type="borrowed" />
            </div>
            <div className="mt-2 h-[100%-0.5rem] w-full">
              <TransactionsList type="lended" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-full min-h-[60vh] w-full rounded-lg border">
      <Tabs defaultValue="borrowed" className="h-full w-full">
        <TabsList className="w-full rounded-b-none">
          <TabsTrigger value="borrowed" className="w-full">
            Borrowed
          </TabsTrigger>
          <TabsTrigger value="lended" className="w-full">
            Lended
          </TabsTrigger>
        </TabsList>
        {/* 100% - tab trigger height - margin top */}
        <TabsContent className="h-[calc(100%-2.5rem-0.5rem)]" value="borrowed">
          <TransactionsList type="borrowed" />
        </TabsContent>
        <TabsContent className="h-[calc(100%-2.5rem-0.5rem)]" value="lended">
          <TransactionsList type="lended" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TransactionsList({ type }: { type: "borrowed" | "lended" }) {
  let { transactions } = useContext(TransactionsContext);
  let user = useContext(UserContext);
  user = user?.pfpColour ? { ...user, id: "me", name: "Me" } : user;
  transactions = transactions.filter((transaction) => {
    if (user?.id === undefined) return false;
    if (transaction.borrower.id === user.id) {
      return type === "borrowed";
    } else if (transaction.lender.id === user.id) {
      return type === "lended";
    }
  });

  return (
    <div className="h-[60vh] divide-y overflow-auto px-2">
      {transactions.map((transaction) => {
        return (
          <TransactionListItem
            transaction={transaction}
            transactionType={type}
            key={transaction._id}
          />
        );
      })}
    </div>
  );
}

function TransactionListItem({
  transaction,
  transactionType,
}: {
  transaction: Transaction;
  transactionType: "borrowed" | "lended";
}) {
  const { deleteTransaction } = useContext(TransactionsContext);
  const friend =
    transactionType === "borrowed" ? transaction.lender : transaction.borrower;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto w-full items-center gap-4 rounded-none p-2 py-3"
        >
          <ProfilePic letter={friend.name[0]} color={friend.pfpColor} />
          <span>{friend.name}</span>
          <span className="ml-auto text-xl font-semibold text-muted-foreground">
            &#8377;{transaction.amount}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>
            {transactionType === "borrowed"
              ? `You Owe ${friend.name}`
              : `${friend.name} Owes You`}{" "}
            &#8377;{transaction.amount}
          </DialogDescription>
          <div className="grid gap-4 py-4">
            <div>
              <div className="text-sm text-muted-foreground">Amount</div>
              <div>{transaction.amount}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Description</div>
              <div>{transaction.description}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Created By</div>
              <div>{transaction.createdBy.name}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Created At</div>
              <div>{new Date(transaction.createdAt).toLocaleString()}</div>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="flex-col gap-4 sm:justify-between sm:gap-2">
          <Button
            variant="destructive"
            onClick={(e) => {
              deleteTransaction(transaction._id);
            }}
          >
            Delete
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
