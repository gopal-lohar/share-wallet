"use server";

import Dashboard from "@/components/Dashboard";

export default async function Home() {
  const transactions = null;
  return <Dashboard transactionsProp={transactions} />;
}
