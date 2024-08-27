export interface UserDetails {
  id: string;
  name: string;
  email: string;
  pfpColour: string;
}

export interface Transaction {
  _id: string;
  createdBy: string;
  friend: Friend;
  amount: number;
  owesMoney: boolean; // if current user owes money to friend
  description: string;
  createdAt: string; // remove this and use createdAt and EditedAt instead
}

export interface Friend {
  id: string;
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
