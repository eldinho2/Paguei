import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { checkUser, Registration, Login } from "../utils/api";

type User = {
  name: string;
  email: string;
  image: string;
};

export const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }: any): Promise<any> {
      const email = user?.email;
      const result = await checkUser(email as string);
      console.log("result", result);

      if (result === true) {
        user.accessToken = await Login(user as User);
      } else {
        user.accessToken = await Registration(user as User);
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }

      return token;
    },

    async session({ session, token }: any): Promise<any> {
      session.accessToken = token.accessToken;
      session.user = token;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
