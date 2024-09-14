"use client";

import { createContext } from "react";

export type UserMode = "online" | "offline" | null;

const UserModeContext = createContext<UserMode>(null);

export default UserModeContext;
