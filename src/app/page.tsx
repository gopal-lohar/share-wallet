"use server";

import Dashboard from "@/app/_components/_dashboard/Dashboard";
import { getTransactions } from "@/app/_actions/transactions";

export default async function Home() {
  const transactions = await getTransactions();
  return <Dashboard transactionsProp={transactions} />;
}
