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
      <div className="w-full rounded-lg border h-full min-h-[70vh]">
        <div className="w-full h-full">
          <div className="inline-flex h-10 items-center justify-center rounded-md border-b p-1 w-full rounded-b-none">
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium w-full">
              You Owe
            </div>
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium w-full">
              You are Owed
            </div>
          </div>
          {/* 100% - OweOwed title height - extra space at bottom to make separator look good */}
          <div className="flex divide-x h-[calc(100%-2.5rem-0.5rem)]">
            {/* 100% - margin compansation */}
            <div className="w-full mt-2 h-[100%-0.5rem]">
              <TransactionsList type="owe" />
            </div>
            <div className="w-full mt-2 h-[100%-0.5rem]">
              <TransactionsList type="owed" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full rounded-lg border h-full min-h-[70vh]">
      <Tabs defaultValue="owe" className="w-full h-full">
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
    <div className="px-2 h-full overflow-auto divide-y">
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
          className="w-full rounded-none gap-4 items-center p-2 py-3 h-auto"
        >
          <ProfilePic
            letter={transaction.friend.name[0]}
            color={transaction.friend.pfpColor}
          />
          <span>{transaction.friend.name}</span>
          <span className="text-xl ml-auto text-muted-foreground font-semibold">
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
              <div className="text-muted-foreground text-sm">Amount</div>
              <div>{transaction.amount}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Description</div>
              <div>{transaction.description}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Created By</div>
              <div>{transaction.createdBy}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Created At</div>
              <div>{new Date(transaction.time).toLocaleString()}</div>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="gap-4 flex-col sm:justify-between sm:gap-2">
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
