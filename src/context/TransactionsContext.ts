"use client";

import { createContext } from "react";

import { Transaction } from "@/types/types";

const TransactionsContext = createContext<{ transactions: Transaction[] }>({
  transactions: [],
});

export default TransactionsContext;
