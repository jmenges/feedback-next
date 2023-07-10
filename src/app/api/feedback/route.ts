import { Feedback } from "@/models/feedback";
import { patchFeedbackSchema, postFeedbackSchema } from "@/validations/feedback";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/* Create new feedback */
/* TODO: add authentication */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const feedbackParsed = postFeedbackSchema.parse(body);

    /* Insert feedback into database */
    const isSuccess = await Feedback.add(feedbackParsed, 1);
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


/* Edit feedback */
/* TODO: add authentication */
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const feedbackParsed = patchFeedbackSchema.parse(body);

    /* Update feedback in database */
    const isSuccess = await Feedback.update(feedbackParsed, 1);
    if (!isSuccess) {
      throw new Error("Failed to update feedback");
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

