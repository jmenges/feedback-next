import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export function genBackLinkServer(currentPath: string) {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const referer = headersList.get("referer");
  const path = referer?.split(domain)[1] || "";
  const backPath = path === "" || path.endsWith(currentPath) ? "/" : path;

  return backPath;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export function getServerUser() {
  return {
    id: 1,
    image: "/assets/user-images/image-thomas.jpg",
    name: "Thomas Hood",
    username: "brawnybrave",
  };
}

export const getServerSessionUser = async () => {
  const session = await getServerSession(authOptions)
  return session?.user
}
