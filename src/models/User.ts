import mongoose, { Model, Document } from "mongoose";

interface UserSchemaInterface extends Document {
  id: string;
  name: string;
  email: string;
  pfpColour: string;
}
const userSchema = new mongoose.Schema<UserSchemaInterface>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pfpColour: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<UserSchemaInterface> =
  mongoose.models.User ||
  mongoose.model<UserSchemaInterface>("User", userSchema);

export default User;
