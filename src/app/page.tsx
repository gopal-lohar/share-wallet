"use server";

import Dashboard from "@/components/Dashboard";
import { getTransactions } from "./_actions/transactions";

export default async function Home() {
  const transactions = await getTransactions();
  return <Dashboard transactionsProp={transactions} />;
}
