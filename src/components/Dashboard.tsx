"use client";

import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/types";
import Transactions from "@/components/Transactions";
import { UserBalance } from "@/components/Balance";
import TransactionsContextProvider from "@/context/TransactionsContextProvider";

export default function Dashboard({
  transactions,
}: {
  transactions: Transaction[] | null;
}) {
  return (
    // height = 100vh - nav height
    <div className="w-full max-w-[1500px] mx-auto p-2 sm:py-4 flex flex-col gap-4 h-[calc(100vh-4rem)] overflow-auto">
      <TransactionsContextProvider data={transactions || []}>
        <DashboardHeader />
        <UserBalance />
        <Transactions />
      </TransactionsContextProvider>
    </div>
  );
}

function DashboardHeader() {
  return (
    <div className="flex gap-4 sm:gap-10 flex-wrap flex-col sm:flex-row">
      <h2 className="text-3xl font-bold text-muted-foreground hidden sm:inline-block">
        Dashboard
      </h2>
      <div className="w-full sm:w-max flex gap-2 ml-auto">
        <Button className="w-full sm:w-max" variant="secondary">
          Friends
        </Button>
        <Button className="w-full sm:w-max" variant="secondary">
          Add Expense
        </Button>
      </div>
    </div>
  );
}
