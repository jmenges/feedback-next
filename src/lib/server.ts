import { authOptions } from "@/lib/auth";
import {
  FeedbackPopulated,
  FeedbackPopulatedAuthenticated,
} from "@/types/feedbacks";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";


/* Prisma init */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

/* User functions */
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

/*  */
export const getRoadmapCounts = ({
  feedbacks,
}: {
  feedbacks: FeedbackPopulated[] | FeedbackPopulatedAuthenticated[];
}): {
  counts: {
    title: string;
    count: number;
  }[];
} => {
  const feedbacksStatus = feedbacks.map(({ status }) => status);
  return {
    counts: [
      {
        title: "Planned",
        count: feedbacksStatus.reduce(
          (acc: number, curr) => acc + Number(curr === "planned"),
          0
        ),
      },
      {
        title: "In-Progress",
        count: feedbacksStatus.reduce(
          (acc: number, curr) => acc + Number(curr === "in-progress"),
          0
        ),
      },
      {
        title: "Live",
        count: feedbacksStatus.reduce(
          (acc: number, curr) => acc + Number(curr === "live"),
          0
        ),
      },
    ],
  };
};
