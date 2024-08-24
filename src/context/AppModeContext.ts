"use client";

import { createContext } from "react";

export type AppMode = "online" | "offline" | null;

const AppModeContext = createContext<AppMode>(null);

export default AppModeContext;
