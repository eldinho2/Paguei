import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { checkUser, Registration, Login } from "../utils/api";
import { jwtDecode } from "jwt-decode";

type User = {
  name: string;
  email: string;
  image: string;
};

async function refreshAccessToken(token: any) {
  try {
    const user = {
      email: token.email,
      name: token.name,
      image: token.image,
    };

    const refreshedTokens = await Login(user);

    return {
      ...token,
      accessToken2: refreshedTokens,
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

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

      if (result === true) {
        user.accessToken = await Login(user as User);
      } else {
        user.accessToken = await Registration(user as User);
      }

      return true;
    },

    async jwt({ token, user }) {

      token = { ...token, ...user };

      const decoded = jwtDecode(token.accessToken as string);

      const currentTime = Date.now() / 1000;
      

      if ((decoded.exp ?? 0) < currentTime) {
        const refreshedToken = await refreshAccessToken(token);
        const formattedToken = {
          ...token,
          accessToken: refreshedToken.accessToken2,
        };
  
        return formattedToken;
      }
      return token;
    },

    async session({ session, token }: any): Promise<any> {
      session.user = token;
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
