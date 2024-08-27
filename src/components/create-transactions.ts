import { Friend, Transaction } from "@/types/types";
import { Expense } from "./AddExpenseForm";

export function createTransactions(createdBy: Friend, expense: Expense) {
  const transactions: Transaction[] = [];
  const lender = expense.paidBy[0];
  for (let i = 0; i < expense.expenseWith.length; i++) {
    const borrower = expense.expenseWith[i];
    if (borrower.id === lender.id) continue;
    transactions.push({
      _id: `${Date.now().toString()}-${Math.floor(Math.random() * 10e9)}`,
      createdBy,
      borrower,
      lender,
      amount: expense.amount / expense.expenseWith.length,
      description: expense.description,
      createdAt: expense.expenseTime.toISOString(),
      editedAt: expense.expenseTime.toISOString(),
    });
  }
  console.log(transactions);
  return transactions;
}
