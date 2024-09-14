"use client";

import { createContext } from "react";

import { Transaction } from "@/types/types";

const TransactionsContext = createContext<{
  transactions: Transaction[];
  deleteTransaction: (id: string) => void;
  addTransaction: (transaction: Transaction) => void;
}>({
  transactions: [],
  deleteTransaction: (id: string) => {},
  addTransaction: (transaction: Transaction) => {},
});

export default TransactionsContext;
