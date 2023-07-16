import { db } from "@/lib/server";
import { CategoryValue } from "@/types/categories";
import {
  FeedbackAdd,
  FeedbackFullyPopulated,
  FeedbackFullyPopulatedAuthenticated,
  FeedbackPopulated,
  FeedbackPopulatedAuthenticated,
  FeedbackUpdate,
} from "@/types/feedbacks";
import { SortOptionValue } from "@/types/sortOptions";
import { Prisma } from "@prisma/client";

/**
 * Prisma validators
 */
const withUpvotes = Prisma.validator<Prisma.FeedbackInclude>()({
  upvotes: {
    select: {
      id: true,
    },
  },
});

export const feedbackPopulated = Prisma.validator<Prisma.FeedbackInclude>()({
  author: true,
  _count: {
    select: {
      comments: true,
      upvotes: true,
    },
  },
});

export const feedbackPopulatedAuthenticated = {
  ...feedbackPopulated,
  ...withUpvotes,
};

export const feedbackFullyPopulated =
  Prisma.validator<Prisma.FeedbackInclude>()({
    author: true,
    comments: {
      include: {
        author: true,
        replies: {
          include: { author: true, replyingToUser: true },
        },
      },
      where: {
        replyingToCommentId: null,
      },
    },
    _count: {
      select: {
        comments: true,
        upvotes: true,
      },
    },
  });

export const feedbackFullyPopulatedAuthenticated = {
  ...feedbackFullyPopulated,
  ...withUpvotes,
};

/**
 * Model definition
 */
export abstract class Feedback {
  static getSortOrder = (
    sortOption?: SortOptionValue
  ): Prisma.FeedbackOrderByWithRelationInput => {
    let orderBy: Prisma.FeedbackOrderByWithRelationInput;
    switch (sortOption) {
      case "upvotes-desc":
        orderBy = {
          upvotes: {
            _count: Prisma.SortOrder.desc,
          },
        };
        break;
      case "upvotes-asc":
        orderBy = {
          upvotes: {
            _count: Prisma.SortOrder.asc,
          },
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
          upvotes: {
            _count: Prisma.SortOrder.desc,
          },
        };
        break;
    }
    return orderBy;
  };

  static queryAll = async ({
    category,
    sort,
    authUserId,
  }: {
    category?: CategoryValue;
    sort?: SortOptionValue;
    authUserId?: string;
  }): Promise<
    FeedbackPopulated[] | FeedbackPopulatedAuthenticated[] | null
  > => {
    /* Handle sorting */
    const orderBy = this.getSortOrder(sort);

    const test = await new Promise((resolve, reject) => {
      setTimeout(() => {resolve("")}, Math.random()*5000)
    })

    /* Execute query */
    const feedbacks = await db.feedback.findMany({
      where: {
        category: category?.toLowerCase(), //TBD what happens if undefined
      },
      include:
        authUserId !== undefined
          ? {
              ...feedbackPopulated,
              upvotes: {
                where: {
                  userId: authUserId,
                },
                select: {
                  id: true,
                },
              },
            }
          : feedbackPopulated,
      orderBy: orderBy,
    });
    return feedbacks;
  };

  static getById = async ({
    id,
    authUserId,
  }: {
    id: string;
    authUserId?: string;
  }): Promise<
    FeedbackFullyPopulated | FeedbackFullyPopulatedAuthenticated | null
  > => {
    /* Execute query */
    const feedback = await db.feedback.findFirst({
      include:
        authUserId !== undefined
          ? {
              ...feedbackFullyPopulated,
              upvotes: {
                where: {
                  userId: authUserId,
                },
                select: {
                  id: true,
                },
              },
            }
          : feedbackFullyPopulated,
      where: {
        id: id,
      },
    });
    return feedback;
  };

  static add = async ({
    feedback,
    authUserId,
  }: {
    feedback: FeedbackAdd;
    authUserId: string;
  }): Promise<boolean> => {
    try {
      const newFeedback = await db.feedback.create({
        data: {
          title: feedback.title,
          description: feedback.description,
          category: feedback.category,
          author: {
            connect: {
              id: authUserId,
            },
          },
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  static update = async ({
    feedback,
    authUserId,
  }: {
    feedback: FeedbackUpdate;
    authUserId: string;
  }): Promise<boolean> => {
    try {
      /* Verify feedback exists and author is the same */
      const dbFeedback = await db.feedback.findFirstOrThrow({
        where: {
          id: feedback.id,
        },
      });
      if (dbFeedback.authorId !== authUserId) {
        throw new Error("Trying to update feedback of other user");
      }

      /* Update feedback */
      const updatedFeedback = await db.feedback.update({
        data: {
          title: feedback.title,
          description: feedback.description,
          category: feedback.category,
          status: feedback.status,
        },
        where: {
          id: feedback.id,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  static remove = async ({
    id,
    authUserId,
  }: {
    id: string;
    authUserId: string;
  }): Promise<boolean> => {
    try {
      const dbFeedback = await db.feedback.findFirstOrThrow({
        where: {
          id: id,
        },
      });

      if (dbFeedback.authorId !== authUserId) {
        throw new Error("Trying to delete feedback of other user");
      }

      const removedFeedback = await db.feedback.delete({
        where: {
          id: id,
        },
      });

      /* Success */
      return true;
    } catch (error) {
      console.log(error);
      /* Failure */
      return false;
    }
  };

  static getRoadmapCounts = async () => {
    const roadmapCounts = await db.feedback.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });
    return roadmapCounts;
  }

  static getAll = async () => {
    const feedbacks = await db.feedback.findMany({
      include: feedbackPopulated,
    });
    return feedbacks;
  };
}
