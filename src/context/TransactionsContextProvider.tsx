"use client";

import { useContext, useEffect, useState } from "react";

import { Transaction } from "@/types/types";
import TransactionsContext from "@/context/TransactionsContext";
import UserContext from "@/context/UserContext";
import { tempTransactions } from "@/lib/temp/transactions";

export default function TransactionsContextProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: Transaction[];
}) {
  const user = useContext(UserContext);
  const [transactions, setTransactions] = useState<Transaction[]>(data);
  useEffect(() => {
    if (!user) {
      setTransactions(tempTransactions);
    }
  }, [user]);
  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
