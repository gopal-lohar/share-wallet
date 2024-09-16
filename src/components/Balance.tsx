import { useContext } from "react";

import TransactionsContext from "@/context/TransactionsContext";
import UserContext from "@/context/UserContext";

export function UserBalance() {
  const { transactions } = useContext(TransactionsContext);
  console.log("transactions in userbalance: ", transactions);
  const user = useContext(UserContext);

  const { owe, owed } = transactions.reduce(
    (acc, transactions) => {
      if (user?.id && transactions.borrower.id === user.id) {
        acc.owe += transactions.amount;
      } else {
        acc.owed += transactions.amount;
      }
      return acc;
    },
    {
      owe: 0,
      owed: 0,
    }
  );

  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4">
      <UserBalanceCard title="Total Balance">{owed - owe}</UserBalanceCard>
      <UserBalanceCard title="You Owe">{owe}</UserBalanceCard>
      <UserBalanceCard title="You are Owed">{owed}</UserBalanceCard>
      {/* <div className="my-1 h-6 w-20 animate-pulse rounded-full bg-secondary"></div> */}
    </div>
  );
}

function UserBalanceCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-lg border bg-transparent shadow sm:min-w-[10rem]">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2 pt-4">
        <h3 className="text-sm font-medium tracking-tight">{title}</h3>
        <span className="text-muted-foreground">&#8377;</span>
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{children}</div>
      </div>
    </div>
  );
}
