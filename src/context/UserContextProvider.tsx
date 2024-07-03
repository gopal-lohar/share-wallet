"use client";

import { UserDetails } from "@/types/types";
import UserContext from "./UserContext";

export default function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserDetails | null;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
