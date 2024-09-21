"use client";

import { Button } from "@/components/ui/button";
import { Friend, Transaction } from "@/types/types";
import Transactions from "@/components/Transactions";
import { UserBalance } from "@/components/Balance";
import TransactionsContextProvider from "@/context/TransactionsContextProvider";
import AddExpenseDialog from "@/components/AddExpenseDialog";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "@/context/UserContext";
import { localStorageKeys } from "@/lib/local-storage-keys";
import FriendsDialog from "@/app/_components/FriendsDialog";

export default function Dashboard({
  transactionsProp,
  friendsProps,
}: {
  transactionsProp: Transaction[] | null;
  friendsProps: Friend[] | null;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const isFirstLoad = useRef(true);
  const user = useContext(UserContext);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      if (user) {
        transactionsProp && setTransactions(transactionsProp);
      } else {
        const storedTransactions = localStorage.getItem(
          localStorageKeys.transactions
        );
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        }
      }
    } else {
      if (!user) {
        localStorage.setItem(
          localStorageKeys.transactions,
          JSON.stringify(transactions)
        );
      }
    }
  }, [transactions, transactionsProp, user]);

  return (
    // height = 100vh - nav height
    <div className="h-[calc(100vh-4rem)] w-full overflow-auto">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-4 p-2 py-4">
        <TransactionsContextProvider
          transactions={transactions}
          setTransactions={setTransactions}
        >
          <DashboardHeader friendsProps={friendsProps} />
          <UserBalance />
          <Transactions />
        </TransactionsContextProvider>
      </div>
    </div>
  );
}

function DashboardHeader({ friendsProps }: { friendsProps: Friend[] | null }) {
  return (
    <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:gap-10">
      <h2 className="hidden text-2xl font-medium text-muted-foreground sm:inline-block">
        Dashboard
      </h2>
      <div className="ml-auto flex w-full gap-2 sm:w-max">
        <FriendsDialog friendsProps={friendsProps} />
        <AddExpenseDialog />
      </div>
    </div>
  );
}
