/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "telegram-login",
      name: "Telegram Login",
      credentials: { id: { label: "Telegram Id", type: "text" } },
      async authorize(credentials) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { id: credentials?.id },
          });
          if (!existingUser) {
            return null;
          }

          return {
            id: existingUser.id,
            username: existingUser.username,
          };
        } catch {
          console.log("Something went wrong while creating the user.");
        }

        return null;
      },
    }),
    CredentialsProvider({
      id: "biometric-login",
      name: "Biometric Login",
      credentials: { id: { label: "Onestep ID", type: "text" } },
      async authorize(credentials) {
        try {
          if (!credentials?.id) {
            console.log("Missing credentials.");
            return null;
          }

          const existingUser = await prisma.user.findUnique({
            where: { id: credentials.id },
          });

          if (!existingUser) {
            console.log("User not found.");
            return null;
          }
          return {
            id: existingUser.id,
            username: existingUser.username,
          };
        } catch {
          console.log("Something went wrong while creating the user.");
        }

        return null;
      },
    }),
    CredentialsProvider({
      id: "passcode-login",
      name: "Passcode Login",
      credentials: { passcode: { label: "Onestep Passcode", type: "text" } },
      async authorize(credentials) {
        try {
          if (!credentials?.passcode) {
            console.log("Missing credentials.");
            return null;
          }

          const existingUser = await prisma.user.findUnique({
            where: { passcode: credentials.passcode },
          });

          if (!existingUser) {
            console.log("User not found.");
            return null;
          }
          console.log(existingUser);
          return {
            id: existingUser.id,
            email: existingUser.username,
          };
        } catch {
          console.log("Something went wrong while creating the user.");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
        };
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
