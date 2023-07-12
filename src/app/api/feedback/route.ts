import { getServerUserOrThrow } from "@/lib/server";
import { Feedback } from "@/models/feedback";
import {
  postFeedbackSchema
} from "@/validations/feedback";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/* Create new feedback */
export async function POST(req: NextRequest) {
  try {
    const user = await getServerUserOrThrow({
      errorMsg: "Only authenticated users can add feedbacks",
    });

    const body = await req.json();
    const feedbackParsed = postFeedbackSchema.parse(body);

    /* Add feedback to model */
    const isSuccess = await Feedback.add({
      feedback: feedbackParsed,
      authUserId: user.id,
    });
    if (!isSuccess) {
      throw new Error("Failed to add feedback");
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