import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { Comment } from "@/models/comment";
import { postCommentSchema } from "@/validations/comment";
import { getServerUser } from "@/lib/server";

/* Create new comment  */
/* TODO: use real user authentication */
export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const user = getServerUser();
  const feedbackId = Number(id);

  try {
    const body = await req.json();
    const commentParsed = postCommentSchema.parse(body);

    /* Insert feedback into database */
    const isSuccess = await Comment.add({
      content: commentParsed.content,
      feedbackId: feedbackId,
      authorId: user.id,
      replyingToCommentId: commentParsed.replyingToCommentId,
      replyingToUserId: commentParsed.replyingToUserId,
    });
    if (!isSuccess) {
      throw new Error("Failed to add feedback to db");
    }
  } catch (error) {
    let errorMsg: string = "";
    if (error instanceof z.ZodError) {
      errorMsg = "Invalid data provided";
      console.log(error.issues);
    } else {
      errorMsg = "An error occurred";
      console.log(error);
    }
    return NextResponse.json(
      { message: errorMsg, success: false },
      { status: 404 }
    );
  }
  return NextResponse.json({ message: "This Worked", success: true });
}
