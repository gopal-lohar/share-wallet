export interface UserDetails {
  googleId: string;
  name: string;
  email: string;
  pfpColor: string;
}

export interface Transaction {
  _id: string;
  friend: Friend;
  amount: number;
  owesMoney: boolean;
  description: string;
  time: string;
  createdBy: string;
}

interface Friend {
  _id: string;
  googleId: string;
  name: string;
  pfpColor: string;
}

export type Expense = {
  _id: string;
  expenseWith: Friend[];
  amount: number;
  description: string;
  paidBy: "me" | Friend;
  expenseTime: Date;
};
