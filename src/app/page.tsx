"use server";

import Dashboard from "@/components/Dashboard";
import { getFriends } from "@/app/_actions/friends";
import { getTransactions } from "@/app/_actions/transactions";
import Friends from "@/app/_components/Friends";

export default async function Home() {
  const transactions = await getTransactions();
  const friends = await getFriends();
  return <Dashboard friendsProps={friends} transactionsProp={transactions} />;
}
