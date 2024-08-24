"use client";

import AppModeContext, { AppMode } from "@/context/AppModeContext";
import { UserDetails } from "@/types/types";
import { useEffect, useState } from "react";

export default function AppModeContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserDetails | null;
}) {
  const [appMode, setAppMode] = useState<AppMode>(null);
  useEffect(() => {
    if (user) {
      setAppMode("online");
    } else {
      setAppMode("offline");
    }
  }, [user]);

  return (
    <AppModeContext.Provider value={appMode}>
      {children}
    </AppModeContext.Provider>
  );
}
