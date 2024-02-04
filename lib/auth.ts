import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import axios from "axios";

export const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/dashboard") return !!auth;
      return true;
    },
    async signIn({ user }): Promise<boolean> {
      console.log("signIn", { user });

      await axios
        .get(`http://localhost:3005/users/user/${user.email}`)
        .then(async function (response) {
          const result = response.data.result;
          if (result) {
            await axios.post('http://localhost:3005/auth/login', user)
              .then(function (response) {
                console.log('Logged in', response);
              })
              .catch(function (error) {
                console.error("Login error", error.message);
              });
          } else {
            await axios.post('http://localhost:3005/auth/register', user)
              .then(function (response) {
                console.log('Registered', response);
              })
              .catch(function (error) {
                console.error("Registration error", error.message);
              });
          }
        })
        .catch(function (error) {
          console.error("errorrrrrr", error.message);
        });
      
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
