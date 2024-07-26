"use server";

import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { z, ZodError } from "zod";

const transactionSchema = z.object({
  friend: z.object({
    googleId: z.string(),
    name: z.string(),
    pfpColor: z.string(),
  }),
  amount: z.number().gt(0),
  owesMoney: z.boolean(),
  description: z.string(),
});

export async function createTransaction(formData: FormData) {
  const data = transactionSchema.safeParse(formData);

  if (!data.success) {
    throw new ZodError(data.error.issues);
  }
  await connectDB();
  const session = await getServerSession();
  const { friend, amount, owesMoney, description } = data.data;
  const currentUserEmail = session?.user?.email;

  const createdBy = await User.findOne({ email: currentUserEmail });

  await Transaction.create({
    createdBy,
    amount,
    friend,
    owesMoney,
    description,
  });
}
