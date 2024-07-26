"use server";

import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import UserContextProvider from "@/context/UserContextProvider";
import { tempTransactions } from "@/lib/temp/transactions";
import { getPfpColor, wait } from "@/lib/utils";
import { Transaction, UserDetails } from "@/types/types";
import { getUserData } from "./_actions/users";

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
  const user = await getUserData();
  const transactions = await getTransactions();
  return (
    <UserContextProvider user={user}>
      <div>
        <Navbar />
        <Dashboard transactions={transactions} />
      </div>
    </UserContextProvider>
  );
}
