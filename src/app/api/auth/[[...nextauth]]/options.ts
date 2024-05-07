import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connect } from "@/lib/dbconfig";
import UserModel from "@/models/User";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credential",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await connect();
        try {
          const user = await UserModel.findOne({
            email: credentials.identifier,
          });

          if (!user) {
            throw new Error("No user found with this email");
          }
          if (!user.isverified) {
            throw new Error("User not verified");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("incorrect password");
          }
        } catch (err: any) {
          throw new Error("something went wrong in Nextauth ");
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session) {
        session.user._id = token._id;
        session.user.isverified = token.isverified;
        session.user.isAccepting = token.isAccepting;
        session.user.username = token.username;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isverified = user.isverified;
        token.isAccepting = user.isAccepting;
        token.username = user.username;
      }

      return token;
    },
  },
  secret: process.env.NEXT_AUTH_SEC,
};
