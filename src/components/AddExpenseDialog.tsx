import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

export const expenseSchema = z.object({
  expenseWith: z
    .array(
      z.object({
        googleId: z.string(),
        name: z.string(),
      })
    )
    .min(1, "There should be at least one friend"),
  amount: z.number().positive("Amount should be Greater than 0"),
  description: z.string().optional(),
  paidBy: z.string().min(1),
  expenseTime: z.date(),
});

type Expense = z.infer<typeof expenseSchema>;
type ExpenseErrors = Partial<Record<keyof Expense, string[]>>;

export default function AddExpenseDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expense, setExpense] = useState({
    expenseWith: [{ googleId: "", name: "" }],
    amount: 0,
    description: "",
    paidBy: "x",
    expenseTime: new Date(),
  });
  const [errors, setErrors] = useState<ExpenseErrors>({});

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-max" variant="secondary">
          Add Expense
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>
            Create a transaction with you friends
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const result = expenseSchema.safeParse(expense);
            if (result.success) {
              console.log("Form submitted successfully", expense);
            } else {
              const formattedErrors = result.error.format();
              const errorMessages: ExpenseErrors = {};
              for (const key in formattedErrors) {
                if (formattedErrors[key as keyof Expense]?._errors) {
                  errorMessages[key as keyof Expense] =
                    formattedErrors[key as keyof Expense]?._errors;
                }
              }
              setErrors(errorMessages);
              console.log("Form not submitted successfully", errorMessages);
            }
          }}
        >
          <div className="flex flex-col gap-2 py-2">
            <Label>With You and</Label>
            {/* <AddExpenseWith expense={expense} setExpense={setExpense} />
            {submitAttempts > 0 && expense.expenseWith.length === 0 && (
              <span className="text-destructive text-sm font-semibold">
                There should be at least one friend
              </span>
            )} */}
          </div>
          <div className="flex flex-col gap-2 py-2">
            <Label htmlFor="amount-input">Amount</Label>
            <Input
              id="amount-input"
              value={expense.amount ? expense.amount : ""}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setExpense((prevExpense) => ({
                  ...prevExpense,
                  amount: Number.isNaN(value) ? 0 : value,
                }));
              }}
            />
            {errors.amount && (
              <span className="text-sm font-medium leading-none text-destructive">
                {errors.amount}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 py-2">
            <Label htmlFor="description-input">Description</Label>
            <Input
              id="description-input"
              // value={expense.description}
              // onChange={(e) => {
              //   setExpense((prevExpense) => ({
              //     ...prevExpense,
              //     description: e.target.value,
              //   }));
              // }}
            />
          </div>
          <div className="flex flex-wrap justify-between gap-2 py-2">
            <Label htmlFor="paidBy-input">Paid By</Label>
            <Select defaultValue="me">
              <SelectTrigger className="w-full" id="paidBy-input">
                <SelectValue placeholder="Paid By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="me">Me</SelectItem>
                {/* {expense.expenseWith.map((friend) => (
                  <SelectItem key={friend.googleId} value={friend.googleId}>
                    {friend.name}
                  </SelectItem>
                ))} */}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2 py-2">
            <Label htmlFor="expense-time-input">Expense Time</Label>
            <Input
              id="expense-time-input"
              // value={expense.expenseTime.toLocaleString()}
              disabled
            />
          </div>
          <div className="flex flex-wrap justify-between gap-2 py-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="border-destructive text-destructive"
                onClick={() => {
                  // resetForm();
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Add Expense</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
