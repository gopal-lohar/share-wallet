import mongoose, { Model, Document } from "mongoose";

interface FriendSchemaInterface extends Document {
  googleId: string;
  name: string;
  pfpColor: string;
}
interface TransactionSchemaInterface extends Document {
  createdBy: mongoose.Schema.Types.ObjectId;
  amount: number;
  friend: FriendSchemaInterface;
  owesMoney: boolean; // if current user owes money to friend
  description: string;
}

const friendSchema = new mongoose.Schema<FriendSchemaInterface>(
  {
    googleId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    pfpColor: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const transactionSchema = new mongoose.Schema<TransactionSchemaInterface>(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    friend: {
      type: friendSchema,
      required: true,
      unique: true,
    },
    owesMoney: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction: Model<TransactionSchemaInterface> =
  mongoose.models.Transaction ||
  mongoose.model<TransactionSchemaInterface>("Transaction", transactionSchema);

export default Transaction;
