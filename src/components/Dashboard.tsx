"use client";

import useWidth from "@/hooks/useWidth";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  return (
    <div className="container mx-auto pt-8">
      <DashboardHeader />
      <UserBalance />
      <Transactions />
    </div>
  );
}

function Transactions() {
  const windowWidth = useWidth();
  if (windowWidth && windowWidth > 640) {
    return (
      <div className="w-full rounded-lg border mb-4">
        <div className="w-full">
          <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 w-full rounded-b-none">
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium w-full">
              asdf
            </div>
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium w-full">
              Password
            </div>
          </div>
          <div className="flex divide-x-2">
            <div className="w-full mt-2">
              Make changes to your account here.
            </div>
            <div className="w-full m-2">Change your password here.</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full rounded-lg border mb-4">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full rounded-b-none">
          <TabsTrigger value="account" className="w-full">
            Account
          </TabsTrigger>
          <TabsTrigger value="password" className="w-full">
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

function ResponsiveTabTable() {}

function UserBalance() {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 py-4">
      <UserBalanceCard title="Total Balance">100</UserBalanceCard>
      <UserBalanceCard title="Total Balance">100</UserBalanceCard>
      <UserBalanceCard title="Total Balance">100</UserBalanceCard>
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
