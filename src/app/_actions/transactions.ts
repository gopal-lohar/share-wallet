"use server";

import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import User from "@/models/User";
import { Transaction as TransactionType } from "@/types/types";
import { getServerSession } from "next-auth";
import { z, ZodError } from "zod";
import { getUserData } from "./users";

const transactionSchema = z.object({
  friend: z.object({
    id: z.string(),
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

export async function getTransactions(): Promise<TransactionType[] | null> {
  const user = await getUserData();
  if (!user) return null;

  await connectDB();
  return [
    {
      _id: "1726498490720-216599266",
      createdBy: { id: "me", name: "Me", pfpColor: "hsl(178 ,35% ,45%)" },
      borrower: { id: "me", name: "Me", pfpColor: "hsl(178 ,35% ,45%)" },
      lender: {
        id: "1726498361012-71063510318",
        name: "Tom",
        pfpColor: "hsl(60 ,35% ,45%)",
      },
      amount: 1000,
      description: "d",
      createdAt: "2024-09-16T14:54:41.982Z",
      editedAt: "2024-09-16T14:54:41.982Z",
    },
    {
      _id: "1726498480133-7484468122",
      createdBy: { id: "me", name: "Me", pfpColor: "hsl(178 ,35% ,45%)" },
      borrower: { id: "me", name: "Me", pfpColor: "hsl(178 ,35% ,45%)" },
      lender: {
        id: "1726498366866-6676433984",
        name: "Tony",
        pfpColor: "hsl(60 ,35% ,45%)",
      },
      amount: 1000,
      description: "New Transactions",
      createdAt: "2024-09-16T14:54:16.170Z",
      editedAt: "2024-09-16T14:54:16.170Z",
    },
    {
      _id: "1726498454606-6978569925",
      createdBy: { id: "me", name: "Me", pfpColor: "hsl(178 ,35% ,45%)" },
      borrower: {
        id: "1726498380800-85998401589",
        name: "Titan",
        pfpColor: "hsl(282 ,35% ,45%)",
      },
      lender: { id: "me", name: "Me", pfpColor: "hsl(178 ,35% ,45%)" },
      amount: 2000,
      description: "Test",
      createdAt: "2024-09-16T14:53:59.979Z",
      editedAt: "2024-09-16T14:53:59.979Z",
    },
    {
      _id: "1726498437817-8536443978",
      createdBy: { id: "me", name: "Me", pfpColor: "hsl(178 ,35% ,45%)" },
      borrower: {
        id: "1726498361012-71063510318",
        name: "Tom",
        pfpColor: "hsl(60 ,35% ,45%)",
      },
      lender: { id: "me", name: "Me", pfpColor: "hsl(178 ,35% ,45%)" },
      amount: 1000,
      description: "First transactions",
      createdAt: "2024-09-16T14:53:31.007Z",
      editedAt: "2024-09-16T14:53:31.007Z",
    },
  ];
}
