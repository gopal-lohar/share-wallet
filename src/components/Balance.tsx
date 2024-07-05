import { useContext } from "react";

import TransactionsContext from "@/context/TransactionsContext";

export function UserBalance() {
  const { transactions } = useContext(TransactionsContext);
  const { owe, owed } = transactions.reduce(
    (acc, transactions) => {
      if (transactions.owesMoney) {
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
    <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
      <UserBalanceCard title="Total Balance">
        {owed - owe || (
          <div className="h-6 w-20 animate-pulse bg-secondary rounded-full my-1"></div>
        )}
      </UserBalanceCard>
      <UserBalanceCard title="You Owe">
        {owe || (
          <div className="h-6 w-20 animate-pulse bg-secondary rounded-full my-1"></div>
        )}
      </UserBalanceCard>
      <UserBalanceCard title="You are Owed">
        {owed || (
          <div className="h-6 w-20 animate-pulse bg-secondary rounded-full my-1"></div>
        )}
      </UserBalanceCard>
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
    <div className="rounded-lg border bg-transparent shadow w-full sm:min-w-[10rem]">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
        <h3 className="tracking-tight text-sm font-medium">{title}</h3>
        <span className=" text-muted-foreground">&#8377;</span>
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{children}</div>
      </div>
    </div>
  );
}
