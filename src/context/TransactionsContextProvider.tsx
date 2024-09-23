"use client";

import { useCallback, useState } from "react";

import { TransactionInterface } from "@/types/types";
import TransactionsContext from "@/context/TransactionsContext";

export default function TransactionsContextProvider({
  children,
  transactions,
  setTransactions,
}: {
  children: React.ReactNode;
  transactions: TransactionInterface[];
  setTransactions: React.Dispatch<React.SetStateAction<TransactionInterface[]>>;
}) {
  const deleteTransaction = useCallback(
    (id: string) => {
      setTransactions((prevTransactions) => {
        return prevTransactions.filter((transaction) => transaction._id !== id);
      });
    },
    [setTransactions]
  );
  const addTransaction = useCallback(
    (transaction: TransactionInterface) => {
      setTransactions((prevTransactions) => {
        return [transaction, ...prevTransactions];
      });
    },
    [setTransactions]
  );
  return (
    <TransactionsContext.Provider
      value={{ transactions, deleteTransaction, addTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
