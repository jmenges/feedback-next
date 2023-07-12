import { db } from "@/lib/server";

/**
 * Model definition
 */
export abstract class Upvote {
  static add = async ({
    feedbackId,
    authUserId,
  }: {
    feedbackId: string;
    authUserId: string;
  }): Promise<boolean> => {
    try {
      const upvoteId = await db.upvote.upsert({
        where: {
          userId_feedbackId: {
            userId: authUserId,
            feedbackId: feedbackId,
          },
        },
        update: {},
        create: {
          userId: authUserId,
          feedbackId: feedbackId,
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

  static remove = async ({
    feedbackId,
    authUserId,
  }: {
    feedbackId: string;
    authUserId: string;
  }): Promise<boolean> => {
    try {
      const removedUpvoteId = await db.upvote.delete({
        where: {
          userId_feedbackId: {
            userId: authUserId,
            feedbackId: feedbackId,
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
}
