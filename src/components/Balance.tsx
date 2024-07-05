export function UserBalance() {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
      <UserBalanceCard title="Total Balance">
        {234 || (
          <div className="h-6 w-20 animate-pulse bg-secondary rounded-full my-1"></div>
        )}
      </UserBalanceCard>
      <UserBalanceCard title="You Owe">
        {24 || (
          <div className="h-6 w-20 animate-pulse bg-secondary rounded-full my-1"></div>
        )}
      </UserBalanceCard>
      <UserBalanceCard title="You are Owed">
        {324 || (
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
