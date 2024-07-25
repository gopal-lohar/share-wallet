import mongoose, { Model, Document } from "mongoose";

interface UserSchemaInterface extends Document {
  googleId: string;
  name: string;
  email: string;
  pfpColour: string;
}
const userSchema = new mongoose.Schema<UserSchemaInterface>(
  {
    googleId: {
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
  mongoose.models.Users ||
  mongoose.model<UserSchemaInterface>("Users", userSchema);

export default User;
