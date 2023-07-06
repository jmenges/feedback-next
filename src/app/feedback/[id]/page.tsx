"use client";

import FeedbackItem from "@/components/FeedbackItem";
import CommentForm from "@/components/comments/CommentForm";
import CommentList from "@/components/comments/CommentList";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import Link from "next/link";

export default function FeedbackDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const { getById, upvoteFeedback } = useFeedbackStore();
  const feedback = getById(Number(id));

  if (!feedback) return;

  // const backHref = genBackLink("")

  return (
    <div className="mt-6 flex flex-col gap-6 tablet:mt-0">
      {/* Actions */}
      <div className="flex justify-between">
        <BackButton variant="link" href="/" />

        <Button variant="accent" asChild>
          <Link href={`/feedback/${feedback.id}/edit`}>Edit Feedback</Link>
        </Button>
      </div>
      {/* Feedback Card */}
      <FeedbackItem upvoteFeedback={upvoteFeedback} feedback={feedback} />
      {/* Comments */}
      <CommentList />
      <CommentForm />
    </div>
  );
}
