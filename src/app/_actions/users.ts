"use server";

import { connectDB } from "@/lib/mongodb";
import { getPfpColor } from "@/lib/utils";
import User from "@/models/User";
import { UserDetails } from "@/types/types";
import { getServerSession } from "next-auth";

export async function createUser(data: any) {
  await connectDB();
  const { user } = data;
  const googleId = user.id;
  const name = user.name;
  const email = user.email;

  const pfpColour = getPfpColor(googleId);
  const existingUser = await User.findOne({ googleId });
  if (existingUser) return;
  await User.create({
    googleId,
    name,
    email,
    pfpColour,
  });
}

export async function getUserData(): Promise<UserDetails | null> {
  await connectDB();
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) return null;

  const user = await User.findOne({ email }).lean();
  return user;
}
