import { commentPopulated, replyPopulated } from "@/models/comment";
import { Prisma } from "@prisma/client";

export type CommentPopulated = Prisma.CommentGetPayload<{
  include: typeof commentPopulated;
}>;

export type ReplyPopulated = Prisma.CommentGetPayload<{
  include: typeof replyPopulated;
}>;

export type CommentAdd = { feedbackId: number } & Pick<
  Prisma.CommentCreateInput,
  "content"
>;
