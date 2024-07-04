"use client";

import { createContext } from "react";

import { UserDetails } from "@/types/types";

const UserContext = createContext<UserDetails | null>(null);

export default UserContext;
