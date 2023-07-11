import { db } from "@/lib/server";
import { CategoryValue } from "@/types/categories";
import {
  FeedbackAdd,
  FeedbackFullyPopulated,
  FeedbackUpdate,
} from "@/types/feedbacks";
import { SortOptionValue } from "@/types/sortOptions";
import { Prisma, Feedback as FeedbackBase } from "@prisma/client";

/**
 * Prisma validators
 */
export const feedbackPopulated = Prisma.validator<Prisma.FeedbackInclude>()({
  author: true,
  upvotes: {
    select: {
      id: true,
    },
  },
  _count: {
    select: {
      comments: true,
      upvotes: true,
    },
  },
});

export const feedbackFullyPopulated =
  Prisma.validator<Prisma.FeedbackInclude>()({
    author: true,
    upvotes: {
      select: {
        id: true,
      },
    },
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

/**
 * Model definition
 */
export abstract class Feedback {
  static queryAll = async ({
    category,
    sort,
    authUserId,
  }: {
    category?: CategoryValue;
    sort?: SortOptionValue;
    authUserId?: number;
  }) => {
    /* Handle sorting */
    let orderBy: Prisma.FeedbackOrderByWithRelationInput;
    switch (sort) {
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

    /* Execute query */
    const feedbacks = await db.feedback.findMany({
      where: {
        category: category?.toLowerCase(), //TBD what happens if undefined
      },
      include: {
        ...feedbackPopulated,
        upvotes: {
          where: {
            userId: authUserId,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: orderBy,
    });
    return feedbacks;
  };

  static getById = async ({
    id,
    authUserId,
    includeRelations,
  }: {
    id: number;
    authUserId?: number;
    includeRelations: boolean;
  }): Promise<FeedbackBase | FeedbackFullyPopulated | null> => {
    /* Execute query */
    const feedback = await db.feedback.findFirst({
      include: includeRelations
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
        : null,
      where: {
        id: id,
      },
    });
    return feedback;
  };

  static add = async (
    feedback: FeedbackAdd,
    authorId: number
  ): Promise<boolean> => {
    try {
      const newFeedback = await db.feedback.create({
        data: {
          title: feedback.title,
          description: feedback.description,
          category: feedback.category,
          author: {
            connect: {
              id: authorId,
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

  static update = async (
    feedback: FeedbackUpdate,
    authorId: number
  ): Promise<boolean> => {
    try {
      /* Verify feedback exists and author is the same */
      const dbFeedback = await db.feedback.findFirstOrThrow({
        where: {
          id: feedback.id,
        },
      });
      if (dbFeedback.authorId !== authorId) {
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
    userId,
  }: {
    id: number;
    userId: number;
  }): Promise<boolean> => {
    try {
      const dbFeedback = await db.feedback.findFirstOrThrow({
        where: {
          id: id,
        },
      });

      if (dbFeedback.authorId !== userId) {
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

  static upvote = async ({
    id,
    userId,
  }: {
    id: number;
    userId: number;
  }): Promise<boolean> => {
    try {
      const upvoteId = await db.upvote.upsert({
        where: {
          userId_feedbackId: {
            userId,
            feedbackId: id,
          },
        },
        update: {},
        create: {
          userId,
          feedbackId: id,
        },
        select: {
          id: true,
        },
      });
      if (!upvoteId) {
        throw new Error("Could not upvote feedback");
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  };

  static removeUpvote = async ({
    id,
    userId,
  }: {
    id: number;
    userId: number;
  }): Promise<boolean> => {
    try {
      const removedUpvoteId = await db.upvote.delete({
        where: {
          userId_feedbackId: {
            userId,
            feedbackId: id,
          },
        },
        select: {
          id: true,
        },
      });
      if (!removedUpvoteId) {
        throw new Error("Could not remove feedback");
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  };

  static getAll = async () => {
    const feedbacks = await db.feedback.findMany({
      include: feedbackPopulated,
    });
    return feedbacks;
  };
}
