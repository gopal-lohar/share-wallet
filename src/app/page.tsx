"use server";

import Dashboard from "@/components/Dashboard";
import { getFriends } from "@/app/_actions/friends";
import { getTransactions } from "@/app/_actions/transactions";

export default async function Home() {
  const transactions = await getTransactions();
  return <Dashboard transactionsProp={transactions} />;
}
