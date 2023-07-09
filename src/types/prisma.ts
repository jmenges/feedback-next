import { feedbackPopulated } from "@/models/feedback";
import { Prisma } from "@prisma/client";

/**
 * Feedbacks
 */
export type FeedbackPopulated = Prisma.FeedbackGetPayload<{
  include: typeof feedbackPopulated;
}>;
