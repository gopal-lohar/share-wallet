"use client";

import UserModeContext, { UserMode } from "@/context/UserModeContext";
import { UserDetails } from "@/types/types";
import { useEffect, useState } from "react";

export default function UserModeContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserDetails | null;
}) {
  const [userMode, setUserMode] = useState<UserMode>(null);
  useEffect(() => {
    if (user) {
      setUserMode(() => "online");
    } else {
      setUserMode(() => "offline");
    }
  }, [user]);

  return (
    <UserModeContext.Provider value={userMode}>
      {children}
    </UserModeContext.Provider>
  );
}
