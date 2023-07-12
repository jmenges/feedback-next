import { getServerUser, getServerUserOrThrow } from "@/lib/server";
import { Feedback } from "@/models/feedback";
import { patchFeedbackSchema } from "@/validations/feedback";
import { NextRequest, NextResponse } from "next/server";

/* Remove a given feedback */
export async function DELETE(
  req: NextRequest,
  { params: { id: feedbackId } }: { params: { id: string } }
) {
  try {
    const user = await getServerUserOrThrow({
      errorMsg: "Only authenticated users can remove feedbacks",
    });

    /* Delete feedback using model */
    const isSuccess = await Feedback.remove({
      id: feedbackId,
      userId: user.id,
    });

    if (!isSuccess) {
      throw new Error("Failed to add feedback to db");
    }
  } catch (error) {
    let errorMsg: string = "An error occurred";
    console.log(error);
    return NextResponse.json(
      { message: errorMsg, success: false },
      { status: 404 }
    );
  }
  return NextResponse.json({ message: "This Worked", success: true });
}

/* Updates a given feedback */
export async function PATCH(
  req: NextRequest,
  { params: { id: feedbackId } }: { params: { id: string } }
) {
  try {
    const user = await getServerUserOrThrow({
      errorMsg: "Only authenticated users can update feedbacks",
    });

    const body = await req.json();
    const feedbackParsed = patchFeedbackSchema.parse(body);

    /* Update feedback in model */
    const isSuccess = await Feedback.update({
      feedback: {
        id: feedbackId,
        ...feedbackParsed,
      },
      authUserId: user.id,
    });
    console.log(isSuccess);
    if (!isSuccess) {
      throw new Error("Failed to update feedback");
    }
  } catch (error) {
    let errorMsg: string = "An error occurred";
    console.log(error);
    return NextResponse.json(
      { message: errorMsg, success: false },
      { status: 404 }
    );
  }
  return NextResponse.json({ message: "This Worked", success: true });
}
