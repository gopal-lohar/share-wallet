"use client";

import { createContext } from "react";

import { UserDetailsInterface } from "@/types/types";

const UserContext = createContext<UserDetailsInterface | null>(null);

export default UserContext;
