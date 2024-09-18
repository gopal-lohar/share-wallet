import { useContext } from "react";

import TransactionsContext from "@/context/TransactionsContext";
import UserContext from "@/context/UserContext";

export function UserBalance() {
  const { transactions } = useContext(TransactionsContext);
  const user = useContext(UserContext);
  const computedUser = user
    ? { ...user }
    : { id: "me", name: "Me", pfpColor: "blue" };

  const { borrowed, lended } = transactions.reduce(
    (acc, transaction) => {
      if (transaction.lender.id === computedUser.id) {
        acc.lended += transaction.amount;
      } else if (transaction.borrower.id === computedUser.id) {
        acc.borrowed += transaction.amount;
      }
      return acc;
    },
    { borrowed: 0, lended: 0 }
  );

  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4">
      <UserBalanceCard title="Total Balance">
        {lended - borrowed}
      </UserBalanceCard>
      <UserBalanceCard title="Borrowed">{borrowed}</UserBalanceCard>
      <UserBalanceCard title="Lended">{lended}</UserBalanceCard>
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
