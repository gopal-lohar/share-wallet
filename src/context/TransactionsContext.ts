"use client";

import { createContext } from "react";

import { TransactionInterface } from "@/types/types";

const TransactionsContext = createContext<{
  transactions: TransactionInterface[];
  deleteTransaction: (id: string) => void;
  addTransaction: (transaction: TransactionInterface) => void;
}>({
  transactions: [],
  deleteTransaction: (id: string) => {},
  addTransaction: (transaction: TransactionInterface) => {},
});

export default TransactionsContext;
