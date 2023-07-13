import { db } from "@/lib/server";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "@/validations/auth";

const prisma = new PrismaClient();
const prismaAdapter = PrismaAdapter(prisma);

// TODO: Fix types
/**
 * Overwrite standard createUser from prismaAdapter
 * to map name provided by provider to username
 */
// @ts-ignore
prismaAdapter.createUser = (data) => {
  // we map name to username
  const newUser = {
    username: data.name,
    email: data.email,
    image: data.image,
    emailVerified: data.emailVerified,
  };

  return prisma.user.create({
    data: newUser
  });
};

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const loginParsed = loginSchema.parse(credentials);
          const user = await db.user.findFirst({
            where: {
              username: loginParsed.username,
            },
            include: {
              accounts: {
                where: {
                  provider: "credentials",
                },
              },
            },
          });

          if (!user) {
            throw new Error("User not found");
          }

          if (user.accounts.length === 0) {
            throw new Error("User not registered for login with password");
          }

          if (user.accounts[0].password !== loginParsed?.password) {
            throw new Error("Invalid credentials");
          }

          // sanitize user object and return
          //@ts-ignore
          delete user.accounts;
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  adapter: prismaAdapter,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.name = user.username;
        token.image = user.image;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userId;
      return session;
    },
  },
};

export default NextAuth(authOptions);
