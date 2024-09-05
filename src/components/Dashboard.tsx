"use client";

import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/types";
import Transactions from "@/components/Transactions";
import { UserBalance } from "@/components/Balance";
import TransactionsContextProvider from "@/context/TransactionsContextProvider";
import AddExpenseDialog from "./AddExpenseDialog";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard({
  transactionsProp,
}: {
  transactionsProp: Transaction[] | null;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  return (
    // height = 100vh - nav height
    <div className="h-[calc(100vh-4rem)] w-full overflow-auto">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-4 p-2 sm:py-4">
        <TransactionsContextProvider
          transactions={transactions || []}
          setTransactions={setTransactions}
        >
          <DashboardHeader />
          <UserBalance />
          <Transactions />
        </TransactionsContextProvider>
      </div>
    </div>
  );
}

function DashboardHeader() {
  return (
    <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:gap-10">
      <h2 className="hidden text-2xl font-medium text-muted-foreground sm:inline-block">
        Dashboard
      </h2>
      <div className="ml-auto flex w-full gap-2 sm:w-max">
        <Link href="/friends">
          <Button className="w-full sm:w-max" variant="secondary">
            Friends
          </Button>
        </Link>
        <AddExpenseDialog />
      </div>
    </div>
  );
}
