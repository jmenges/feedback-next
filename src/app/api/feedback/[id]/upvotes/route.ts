import { NextRequest, NextResponse } from "next/server";

import { getServerUserOrThrow } from "@/lib/server";
import { Upvote } from "@/models/uptvote";

/* Add upvote for authenticated user  */
export async function POST(
  req: NextRequest,
  { params: { id: feedbackId } }: { params: { id: string } }
) {
  try {
    const user = await getServerUserOrThrow({
      errorMsg: "Only authenticated users can upvote feedbacks",
    });

    /* Upvote feedback for authenticated user */
    const isSuccess = await Upvote.add({
      feedbackId: feedbackId,
      authUserId: user.id,
    });
    if (!isSuccess) {
      throw new Error("Failed to upvote feedback");
    }
  } catch (error) {
    const errorMsg = "An error occurred";
    console.log(error);
    return NextResponse.json(
      { message: errorMsg, success: false },
      { status: 404 }
    );
  }
  return NextResponse.json({ message: "This Worked", success: true });
}

/* Remove upvote for authenticated user  */
export async function DELETE(
  req: NextRequest,
  { params: { id: feedbackId } }: { params: { id: string } }
) {
  try {
    const user = await getServerUserOrThrow({
      errorMsg: "Only authenticated users can remove its upvotes",
    });

    /* Upvote feedback for authenticated user */
    const isSuccess = await Upvote.remove({
      feedbackId: feedbackId,
      authUserId: user.id,
    });
    if (!isSuccess) {
      throw new Error("Failed to remove upvote of feedback");
    }
  } catch (error) {
    const errorMsg = "An error occurred";
    console.log(error);
    return NextResponse.json(
      { message: errorMsg, success: false },
      { status: 404 }
    );
  }
  return NextResponse.json({ message: "This Worked", success: true });
}
