import { useContext } from "react";

import useWidth from "@/hooks/useWidth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionsContext from "@/context/TransactionsContext";
import ProfilePic from "./ProfilePic";
import { Transaction } from "@/types/types";

export default function Transactions() {
  const windowWidth = useWidth();
  if (windowWidth && windowWidth > 640) {
    return (
      <div className="w-full rounded-lg border h-full min-h-[70vh]">
        <div className="w-full h-full">
          <div className="inline-flex h-16 items-center justify-center rounded-md border-b p-1 w-full rounded-b-none">
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium w-full">
              You Owe
            </div>
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium w-full">
              You are Owed
            </div>
          </div>
          {/* 100% - OweOwed title height - extra space at bottom to make separator look good */}
          <div className="flex divide-x h-[calc(100%-4rem-0.5rem)]">
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
    <div className="p-2 h-full overflow-auto divide-y">
      {transactions.map((transaction) => {
        if (owesMoney !== transaction.owesMoney) return "";
        return (
          <TransactionListItem
            transaction={transaction}
            key={transaction._id}
          />
        );
      })}
    </div>
  );
}

function TransactionListItem({ transaction }: { transaction: Transaction }) {
  return (
    <div className="py-3 px-2 flex gap-4 items-center" key={transaction._id}>
      <ProfilePic
        letter={transaction.friend.name[0]}
        color={transaction.friend.pfpColor}
      />
      <span>{transaction.friend.name}</span>
      <span className="text-xl ml-auto text-muted-foreground font-semibold">
        &#8377;{transaction.amount}
      </span>
    </div>
  );
}
