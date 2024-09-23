"use client";

import { UserDetailsInterface } from "@/types/types";
import UserContext from "@/context/UserContext";

export default function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserDetailsInterface | null;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
