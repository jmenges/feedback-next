import { Feedback } from "@/models/feedback";
import { FeedbacksQueryOptions } from "@/types/feedbacks";
import React from "react";

type Props = {
  feedbacksQueryOptions?: FeedbacksQueryOptions;
};

export default async function FeedbackQueryAllCount({
  feedbacksQueryOptions,
}: Props) {
  /* Query */
  const feedbacks = await Feedback.queryAll({
    ...feedbacksQueryOptions,
  });

  /* Calculated values */
  const feedbackCount = feedbacks?.length || 0;

  return <span>{feedbackCount} </span>;
}
