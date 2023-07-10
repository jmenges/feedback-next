"use client";

import FeedbackItem from "@/components/FeedbackItem";
import { FeedbackPopulated } from "@/types/feedbacks";
import Link from "next/link";

type Props = {
  feedbacks: FeedbackPopulated[];
  // upvoteFeedback: (feedbackId: number) => boolean;
};

export default function FeedbackList({ feedbacks }: Props) {
  const upvoteFeedback = (feedbackId: number) => {return true}

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
