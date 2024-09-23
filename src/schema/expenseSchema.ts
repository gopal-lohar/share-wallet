import { z, ZodFormattedError } from "zod";

export const friendSchema = z.object({
  id: z.string(),
  name: z.string(),
  pfpColor: z.string(),
});

export const expenseSchema = z.object({
  expenseWith: z
    .array(friendSchema)
    .min(2, "There should be at least one friend"),
  paidBy: z.array(friendSchema).min(1, "Paid by can't be empty"), //it's safe to use array here because we are using already made objects which may have things unique to them
  amount: z.number().positive("Amount should be Greater than 0"),
  description: z.string(),
  expenseTime: z.date(),
});

export type ExpenseType = z.infer<typeof expenseSchema>;
export type ExpenseErrorsType = ZodFormattedError<ExpenseType>;
