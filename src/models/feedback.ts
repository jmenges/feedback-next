import { db } from "@/lib/server";
import { ICategory } from "@/types/types";
import { Prisma } from "@prisma/client";

// interface FeedbackModel {
//   static getAll: () => Promise<Prisma.FeedbackGetPayload<{}>[]>;
// }

/**
 * Prisma validators
 */
export const feedbackPopulated = Prisma.validator<Prisma.FeedbackInclude>()({
  author: true,
  _count: {
    select: {
      comments: true,
    },
  },
});

export abstract class Feedback {
  static queryAll = async ({
    category,
    sort,
  }: {
    category?: ICategory;
    sort?: string;
  }) => {
    const feedbacks = await db.feedback.findMany({
      where: {
        category: category?.toLowerCase(), //TBD what happens if undefined
      },
      include: feedbackPopulated,
    });
    return feedbacks;
  };

  static getAll = async () => {
    const feedbacks = await db.feedback.findMany({
      include: feedbackPopulated,
    });
    return feedbacks;
  };

  static getFilteredByCategory = async (category: ICategory) => {
    const feedbacks = await db.feedback.findMany({
      where: {
        category: category,
      },
      include: feedbackPopulated,
    });
    return feedbacks;
  };
}
