"use client";

import FeedbackItem from "@/components/FeedbackItem";
import { IFeedback } from "@/types";
import Link from "next/link";
import { useEffect } from "react";

type Props = {
  feedbacks: IFeedback[];
  upvoteFeedback: (feedbackId: number) => boolean;
};

export default function FeedbackList({ feedbacks, upvoteFeedback }: Props) {
  return (
    <div className="flex flex-col space-y-4 p-6 tablet:p-0">
      {feedbacks.map((feedback) => (
        <Link key={feedback.id} href={`/feedback/${feedback.id}`}>
          <FeedbackItem
            feedback={feedback}
            upvoteFeedback={upvoteFeedback}
          />
        </Link>
      ))}
    </div>
  );
}
