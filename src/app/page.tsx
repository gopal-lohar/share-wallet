"use server";

import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import UserContextProvider from "@/context/UserContextProvider";
import getPfpColor from "@/lib/utils";
import { UserDetails } from "@/types/types";

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

export default async function Home() {
  const user = await getUserData();
  return (
    <UserContextProvider user={user}>
      <div>
        {/* <span>{JSON.stringify(user)}</span> */}
        <Navbar />
        <Dashboard />
      </div>
    </UserContextProvider>
  );
}
