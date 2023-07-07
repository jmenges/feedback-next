"use client";

import FeedbackItem from "@/components/FeedbackItem";
import CommentForm from "@/components/comments/CommentForm";
import CommentList from "@/components/comments/CommentList";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import useLastMainRoute from "@/hooks/useLastMainRoute";
import useLastPath from "@/hooks/useLastMainRoute";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import Link from "next/link";
import { useMemo } from "react";

export default function FeedbackDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  /**
   * Constants
   */
  const feedbackId: number = Number(id);

  /**
   * Custom Hook
   */
  const { feedbacks, addComment, addReply, getById, upvoteFeedback } =
    useFeedbackStore();

  const { path: lastPath } = useLastMainRoute();

  /**
   * Side Effects
   * Memo below, does not trigger reerender.
   * Its triggered by importing the feedbacks from the feedbackStore
   */
  const feedback = useMemo(() => getById(feedbackId), [feedbacks]);

  /**
   * Exit conditions
   */
  if (!feedback) return;

  return (
    <div className="mt-6 flex flex-col gap-6 tablet:mt-0">
      {/* Actions */}
      <div className="flex justify-between">
        <BackButton variant="link" href={lastPath} />

        <Button variant="accent" asChild>
          <Link href={`/feedback/${feedback.id}/edit`}>Edit Feedback</Link>
        </Button>
      </div>
      {/* Feedback Card */}
      <FeedbackItem upvoteFeedback={upvoteFeedback} feedback={feedback} />
      {/* Comments */}
      <CommentList
        feedbackId={feedbackId}
        comments={feedback.comments}
        addReply={addReply}
      />
      <CommentForm feedbackId={feedbackId} addComment={addComment} />
    </div>
  );
}
