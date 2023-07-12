import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

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
    data: newUser,
  });
};

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
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
        token.name = user.name;
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
