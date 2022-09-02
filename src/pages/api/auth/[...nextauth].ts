import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/prisma";
import { TRPCError } from "@trpc/server";
import * as bcrypt from "bcrypt";
import { trpc } from "../../../Utils/trpc";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  //   adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials?.email,
            },
          });
          if (!user) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "User does not exist, try creating an account",
            });
          }
          const isValid = await bcrypt.compare(
            credentials?.password ?? "",
            user.password
          );
          if (!isValid) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Invalid password, please try again",
            });
          }

          return user;
        } catch (e: any) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/register",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      return session;
    },
  },
  // secret: process.env.NEXTAUTH_SECRET,
  // jwt: {
  //   secret: process.env.NEXTAUTH_SECRET,
  // },
};

export default NextAuth(authOptions);
