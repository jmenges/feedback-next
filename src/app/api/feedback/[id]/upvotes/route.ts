import { NextRequest, NextResponse } from "next/server";

import { getServerUser } from "@/lib/server";
import { Feedback } from "@/models/feedback";

/* Add upvote for authenticated user  */
/* TODO: use real user authentication */
export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const user = getServerUser();
  const feedbackId = Number(id);

  try {
    /* Upvote feedback for authenticated user */
    const isSuccess = await Feedback.upvote({
      id: feedbackId,
      userId: user.id,
    });
    if (!isSuccess) {
      throw new Error("Failed upvote feedback");
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
