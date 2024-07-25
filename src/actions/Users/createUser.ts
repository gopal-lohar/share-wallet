import { connectDB } from "@/lib/mongodb";
import { getPfpColor } from "@/lib/utils";
import User from "@/models/Users";
export async function createUser(data: any) {
  await connectDB();
  const { user } = data;
  const googleId = user.id;
  const name = user.name;
  const email = user.email;

  const pfpColour = getPfpColor(googleId);
  const existingUser = await User.findOne({ googleId });
  if (existingUser) return;
  await User.create({
    googleId,
    name,
    email,
    pfpColour,
  });
}
