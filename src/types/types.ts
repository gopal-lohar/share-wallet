export interface UserDetailsInterface {
  id: string;
  name: string;
  email: string;
  pfpColour: string;
}

export interface FriendInterface {
  id: string;
  name: string;
  pfpColor: string;
}

export enum FriendshipStatusEnum {
  None = "none",
  RequestSent = "requestSent",
  RequestReceived = "requestReceived",
  Friends = "friends",
}

export interface UserInterfaceForFriendSearch extends FriendInterface {
  friendShipStatus: FriendshipStatusEnum;
}

export interface ExpenseInterface {
  _id: string;
  expenseWith: FriendInterface[];
  amount: number;
  description: string;
  paidBy: FriendInterface;
  expenseTime: Date;
}

export interface TransactionInterface {
  _id: string;
  createdBy: FriendInterface;
  borrower: FriendInterface;
  lender: FriendInterface;
  amount: number;
  description: string;
  createdAt: string;
  editedAt: string;
}
