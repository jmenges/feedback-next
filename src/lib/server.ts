import { headers } from "next/headers";
import { Feedback, PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FeedbackPopulated } from "@/types/feedbacks";

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

export const getServerUser = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};

export const getServerUserOrThrow = async ({
  errorMsg = "Authentication required",
}: {
  errorMsg: string;
}) => {
  const user = await getServerUser();
  if (user === undefined) {
    throw new Error(errorMsg);
  }
  return user;
};

export const getRoadmapCounts = ({
  feedbacks,
}: {
  feedbacks: FeedbackPopulated[];
}): {
  counts: {
    title: string;
    count: number;
  }[];
} => {
  return {
    counts: [
      {
        title: "Planned",
        count: feedbacks.reduce(
          (acc, curr) => acc + Number(curr.status === "planned"),
          0
        ),
      },
      {
        title: "In-Progress",
        count: feedbacks.reduce(
          (acc, curr) => acc + Number(curr.status === "in-progress"),
          0
        ),
      },
      {
        title: "Live",
        count: feedbacks.reduce(
          (acc, curr) => acc + Number(curr.status === "live"),
          0
        ),
      },
    ],
  };
};
