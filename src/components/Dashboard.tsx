import { Button } from "./ui/button";

export default function Dashboard() {
  return (
    <div className="container mx-auto pt-8">
      <DashboardHeader />
      <div className="w-full flex flex-col sm:flex-row gap-4 py-4">
        <UserBalanceCard title="Total Balance">100</UserBalanceCard>
        <UserBalanceCard title="Total Balance">100</UserBalanceCard>
        <UserBalanceCard title="Total Balance">100</UserBalanceCard>
      </div>
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

function DashboardHeader() {
  return (
    <div className="flex gap-4 sm:gap-10 flex-wrap flex-col sm:flex-row">
      <h2 className="text-3xl font-bold text-muted-foreground">Dashboard</h2>
      <div className="w-full sm:w-max flex gap-2 ml-auto">
        <Button className="w-full sm:w-max" variant="secondary">
          Friends
        </Button>
        <Button className="w-full sm:w-max" variant="secondary">
          Add Expense
        </Button>
      </div>
    </div>
  );
}
