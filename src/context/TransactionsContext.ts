"use client";

import { Transaction } from "@/types/types";
import { createContext } from "react";

const TransactionsContext = createContext<{ transactions: Transaction[] }>({
  transactions: [],
});

export default TransactionsContext;
