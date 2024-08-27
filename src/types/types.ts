export interface UserDetails {
  id: string;
  name: string;
  email: string;
  pfpColour: string;
}

// export interface Transaction {
//   _id: string;
//   createdBy: string;
//   borrower: Friend;
//   lender: Friend;
//   amount: number;
//   description: string;
//   createdAt: string; // remove this and use createdAt and EditedAt instead
// }

// export interface Friend {
//   id: string;
//   name: string;
//   pfpColor: string;
// }

export interface Transaction {
  _id: string;
  createdBy: Friend;
  borrower: Friend;
  lender: Friend;
  amount: number;
  description: string;
  createdAt: string;
  editedAt: string;
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
  paidBy: Friend;
  expenseTime: Date;
};
