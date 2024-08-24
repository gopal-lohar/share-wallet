"use server";

import Dashboard from "@/components/Dashboard";
import { tempTransactions } from "@/lib/temp/transactions";
import { wait } from "@/lib/utils";
import { Transaction } from "@/types/types";

async function getTransactions(): Promise<Transaction[] | null> {
  await wait(500);
  return tempTransactions.map((transaction) => {
    return {
      ...transaction,
      friend: {
        ...transaction.friend,
        name: "server " + transaction.friend.name,
      },
    };
  });
}

export default async function Home() {
  const transactions = await getTransactions();
  return <Dashboard transactions={transactions} />;
}
