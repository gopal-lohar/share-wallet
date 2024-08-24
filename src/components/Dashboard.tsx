"use client";

import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/types";
import Transactions from "@/components/Transactions";
import { UserBalance } from "@/components/Balance";
import TransactionsContextProvider from "@/context/TransactionsContextProvider";
import AddExpenseDialog from "./AddExpenseDialog";
import Link from "next/link";

export default function Dashboard({
  transactions,
}: {
  transactions: Transaction[] | null;
}) {
  return (
    // height = 100vh - nav height
    <div className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-[1500px] flex-col gap-4 overflow-auto p-2 sm:py-4">
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
    <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:gap-10">
      <h2 className="hidden text-3xl font-bold text-muted-foreground sm:inline-block">
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
