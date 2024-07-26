import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser } from "../../../_actions/users";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn(data: any) {
      await createUser(data);
      return true;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
