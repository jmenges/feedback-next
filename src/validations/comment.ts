import { z } from "zod";

const isReply = z.object({
  replyingToCommentId: z.number(),
  replyingToUserId: z.number(),
});
const isComment = z.object({
  replyingToCommentId: z.undefined(),
  replyingToUserId: z.undefined(),
});

const isCommentOrReply = isComment.or(isReply);

export const postCommentSchema = z
  .object({
    content: z.string(),
  })
  .and(isCommentOrReply);
