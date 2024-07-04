"use server";

import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import UserContextProvider from "@/context/UserContextProvider";
import getPfpColor from "@/lib/utils";
import { DashboardData, UserDetails } from "@/types/types";

function getUserData(): Promise<UserDetails | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        googleId: "string",
        name: "Eoln Muks",
        email: "em@em.em",
        pfpColor: getPfpColor("em@em.em"),
      });
    }, 1000);
    // resolve(null);
  });
}

function getDashboardData(): Promise<DashboardData | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        balance: {
          total: 1000,
          owe: 500,
          owed: 500,
        },
        transactions: [
          {
            _id: "string",
            friend: {
              googleId: "string",
              name: "Eoln Muks",
              pfpColor: getPfpColor("em@em.em"),
            },
            amount: 100,
            owesMoney: false,
            description: "Hello hii",
            time: "string",
            createdBy: "string",
          },
        ],
      });
    }, 1000);
  });
}

export default async function Home() {
  const user = await getUserData();
  const dashBoardData = await getDashboardData();
  return (
    <UserContextProvider user={user}>
      <div>
        <Navbar />
        <Dashboard data={dashBoardData} />
      </div>
    </UserContextProvider>
  );
}
