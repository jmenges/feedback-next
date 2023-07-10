import { feedbackPopulated } from "@/models/feedback";
import { Prisma } from "@prisma/client";

/**
 * Feedbacks
 */
export type FeedbackPopulated = Prisma.FeedbackGetPayload<{
  include: typeof feedbackPopulated;
}>;

export type FeedbackAdd = Pick<
  Prisma.FeedbackCreateInput,
  "title" | "category" | "description"
>;

export type FeedbackUpdate = { id: number } & Pick<
  Prisma.FeedbackUpdateInput,
  "title" | "category" | "description" | "status"
>;
