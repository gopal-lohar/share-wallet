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

export default function Transactions() {
  const windowWidth = useWidth();
  if (windowWidth && windowWidth > 640) {
    return (
      <div className="h-full min-h-[70vh] w-full rounded-lg border">
        <div className="h-full w-full">
          <div className="inline-flex h-10 w-full items-center justify-center rounded-md rounded-b-none border-b p-1">
            <div className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium">
              You Owe
            </div>
            <div className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium">
              You are Owed
            </div>
          </div>
          {/* 100% - OweOwed title height - extra space at bottom to make separator look good */}
          <div className="flex h-[calc(100%-2.5rem-0.5rem)] divide-x">
            {/* 100% - margin compansation */}
            <div className="mt-2 h-[100%-0.5rem] w-full">
              <TransactionsList type="owe" />
            </div>
            <div className="mt-2 h-[100%-0.5rem] w-full">
              <TransactionsList type="owed" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-full min-h-[70vh] w-full rounded-lg border">
      <Tabs defaultValue="owe" className="h-full w-full">
        <TabsList className="w-full rounded-b-none">
          <TabsTrigger value="owe" className="w-full">
            You Owe
          </TabsTrigger>
          <TabsTrigger value="owed" className="w-full">
            You are Owed
          </TabsTrigger>
        </TabsList>
        {/* 100% - tab trigger height - margin top */}
        <TabsContent className="h-[calc(100%-2.5rem-0.5rem)]" value="owe">
          <TransactionsList type="owe" />
        </TabsContent>
        <TabsContent className="h-[calc(100%-2.5rem-0.5rem)]" value="owed">
          <TransactionsList type="owed" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TransactionsList({ type }: { type: "owe" | "owed" }) {
  const { transactions } = useContext(TransactionsContext);
  const owesMoney = type === "owe";
  return (
    <div className="h-full divide-y overflow-auto px-2">
      {transactions.map((transaction) => {
        if (owesMoney !== transaction.owesMoney) return "";
        return (
          <TransactionListItem
            transaction={transaction}
            owesMoney={owesMoney}
            key={transaction._id}
          />
        );
      })}
    </div>
  );
}

function TransactionListItem({
  transaction,
  owesMoney,
}: {
  transaction: Transaction;
  owesMoney: boolean;
}) {
  const { deleteTransaction } = useContext(TransactionsContext);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto w-full items-center gap-4 rounded-none p-2 py-3"
        >
          <ProfilePic
            letter={transaction.friend.name[0]}
            color={transaction.friend.pfpColor}
          />
          <span>{transaction.friend.name}</span>
          <span className="ml-auto text-xl font-semibold text-muted-foreground">
            &#8377;{transaction.amount}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>
            {owesMoney
              ? `You Owe ${transaction.friend.name}`
              : `${transaction.friend.name} Owes You`}{" "}
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
              <div>{transaction.createdBy}</div>
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
          <DialogClose>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
