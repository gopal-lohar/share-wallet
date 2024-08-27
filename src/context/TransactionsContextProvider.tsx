"use client";

import { useCallback, useState } from "react";

import { Transaction } from "@/types/types";
import TransactionsContext from "@/context/TransactionsContext";

export default function TransactionsContextProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Transaction[];
}) {
  const [transactions, setTransactions] = useState<Transaction[]>(data);
  const deleteTransaction = useCallback(
    (id: string) => {
      setTransactions((prevTransactions) => {
        return prevTransactions.filter((transaction) => transaction._id !== id);
      });
    },
    [setTransactions]
  );
  return (
    <TransactionsContext.Provider value={{ transactions, deleteTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
