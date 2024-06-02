import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import UserModel from '../../../../models/UserModel.js'
import { dbConnect } from "../../../../features/dbConnect";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await dbConnect();
      try {
        const existinguser = await UserModel.findOne({ email: user.email });
        if (!existinguser) {
          await UserModel.create({
            name: user.name,
            email: user.email,
            registertype: account?.provider.toUpperCase(),
          });
          return true;
        }
        return true;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};

export const hanlder = NextAuth(authOptions);
export { hanlder as GET, hanlder as POST };
