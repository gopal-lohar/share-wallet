"use client";

import { createContext } from "react";

import { Transaction } from "@/types/types";

const TransactionsContext = createContext<{
  transactions: Transaction[];
  deleteTransaction: (id: string) => void;
}>({
  transactions: [],
  deleteTransaction: (id: string) => {},
});

export default TransactionsContext;
