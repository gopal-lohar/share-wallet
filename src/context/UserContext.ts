"use client";

import { UserDetails } from "@/types/types";
import { createContext } from "react";

const UserContext = createContext<UserDetails | null>(null);

export default UserContext;
