import { db } from "@/lib/server";
import { CategoryValue } from "@/types/categories";
import { SortOptionValue } from "@/types/sortOptions";
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
    category?: CategoryValue;
    sort?: SortOptionValue;
  }) => {
    /* Handle sorting */
    let orderBy: Prisma.FeedbackOrderByWithRelationInput;
    switch (sort) {
      case "upvotes-desc":
        orderBy = {
          upvotes: Prisma.SortOrder.desc,
        };
        break;
      case "upvotes-asc":
        orderBy = {
          upvotes: Prisma.SortOrder.asc,
        };
        break;
      case "comments-desc":
        orderBy = {
          comments: {
            _count: Prisma.SortOrder.desc,
          },
        };
        break;
      case "comments-asc":
        orderBy = {
          comments: {
            _count: Prisma.SortOrder.asc,
          },
        };
        break;
      default:
        /* Default sort by upvotes desc */
        orderBy = {
          upvotes: Prisma.SortOrder.desc,
        };
        break;
    }

    /* Execute query */
    const feedbacks = await db.feedback.findMany({
      where: {
        category: category?.toLowerCase(), //TBD what happens if undefined
      },
      include: feedbackPopulated,
      orderBy: orderBy,
    });
    return feedbacks;
  };

  static getAll = async () => {
    const feedbacks = await db.feedback.findMany({
      include: feedbackPopulated,
    });
    return feedbacks;
  };
}
