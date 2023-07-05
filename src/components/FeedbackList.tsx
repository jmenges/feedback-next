"use client";

import FeedbackItem from "@/components/FeedbackItem";
import { IFeedback } from "@/types";
import { useEffect } from "react";

type Props = {
  feedbacks: IFeedback[];
  upvoteFeedback: (feedbackId: number) => boolean;
};

export default function FeedbackList({ feedbacks, upvoteFeedback }: Props) {

  return (
    <div className="space-y-4">
      {feedbacks.map((feedback) => (
        <FeedbackItem
          key={feedback.id}
          feedback={feedback}
          upvoteFeedback={upvoteFeedback}
        />
      ))}
    </div>
  );
}
