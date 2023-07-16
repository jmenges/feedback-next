import {
  feedbackFullyPopulated,
  feedbackFullyPopulatedAuthenticated,
  feedbackPopulated,
  feedbackPopulatedAuthenticated,
} from "@/models/feedback";
import { CategoryValue } from "@/types/categories";
import { SortOptionValue } from "@/types/sortOptions";
import { Prisma } from "@prisma/client";
import { User } from "next-auth";

/**
 * Feedbacks
 */
export type FeedbackPopulated = Prisma.FeedbackGetPayload<{
  include: typeof feedbackPopulated;
}>;

export type FeedbackPopulatedAuthenticated = Prisma.FeedbackGetPayload<{
  include: typeof feedbackPopulatedAuthenticated;
}>;

export type FeedbackFullyPopulated = Prisma.FeedbackGetPayload<{
  include: typeof feedbackFullyPopulated;
}>;

export type FeedbackFullyPopulatedAuthenticated = Prisma.FeedbackGetPayload<{
  include: typeof feedbackFullyPopulatedAuthenticated;
}>;

export type FeedbackAdd = Pick<
  Prisma.FeedbackCreateInput,
  "title" | "category" | "description"
>;

export type FeedbackUpdate = { id: string } & Pick<
  Prisma.FeedbackUpdateInput,
  "title" | "category" | "description" | "status"
>;

export type FeedbacksQueryOptions = {
  category?: CategoryValue;
  sort?: SortOptionValue;
  authUserId?: string;
};
