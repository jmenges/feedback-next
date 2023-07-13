import { db } from "@/lib/server";
import { CommentPopulated } from "@/types/comments";
import { Prisma } from "@prisma/client";

export abstract class Comment {
  static queryByFeedbackId = async (
    feedbackId: string
  ): Promise<CommentPopulated[] | null> => {
    /* Execute query */
    const comments = await db.comment.findMany({
      include: commentPopulated,
      where: {
        feedbackId: feedbackId,
      },
    });
    return comments;
  };

  static add = async ({
    content,
    authorId,
    feedbackId,
    replyingToCommentId,
    replyingToUserId,
  }: {
    content: string;
    authorId: string;
    feedbackId: string;
    replyingToCommentId?: string;
    replyingToUserId?: string;
  }): Promise<boolean> => {
    try {
      /* Handle normal comment */
      if (replyingToCommentId === undefined) {
        await db.comment.create({
          data: {
            content: content,
            feedback: {
              connect: {
                id: feedbackId,
              },
            },
            author: {
              connect: {
                id: authorId,
              },
            },
          },
        });
      } else if (
        replyingToUserId !== undefined &&
        replyingToCommentId !== undefined
      ) {
        /* Handle reply */
        await db.comment.create({
          data: {
            content: content,
            feedback: {
              connect: {
                id: feedbackId,
              },
            },
            replyingToComment: {
              connect: {
                id: replyingToCommentId,
              },
            },
            replyingToUser: {
              connect: {
                id: replyingToUserId,
              },
            },
            author: {
              connect: {
                id: authorId,
              },
            },
          },
        });
      } else {
        throw new Error("Invalid comment data");
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}

/**
 * Prisma validators
 */
export const replyPopulated = Prisma.validator<Prisma.CommentInclude>()({
  author: true,
  replyingToUser: true,
});

export const commentPopulated = Prisma.validator<Prisma.CommentInclude>()({
  author: true,
  replies: {
    include: replyPopulated,
  },
});
