import BackToMainRouteButton from "@/app/_components/BackToMainRouteButton";
import FeedbackItem from "@/app/_components/FeedbackItem";
import CommentForm from "@/app/_components/comments/CommentForm";
import CommentList from "@/app/_components/comments/CommentList";
import { Button } from "@/app/_components/ui/button";
import { getServerUser } from "@/lib/server";
import { Feedback } from "@/models/feedback";
import Link from "next/link";

export default async function FeedbackDetail({
  params: { id: feedbackId },
}: {
  params: { id: string };
}) {
  /* Get auth user */
  const user = await getServerUser();

  /* Run query */
  const feedback = await Feedback.getById({
    id: feedbackId,
    authUserId: user?.id,
  });

  /* Exit conditions */
  if (!feedback) return;

  const isAuthenticated = user !== undefined;
  const isOwner = feedback?.authorId === user?.id;

  /* JSX */
  return (
    <div className="mt-6 flex flex-col gap-6 tablet:mt-0">
      {/* Actions */}
      <div className="flex justify-between">
        <BackToMainRouteButton />

        {isOwner ? (
          <Button variant="accent" asChild>
            <Link href={`/feedback/${feedbackId}/edit`}>Edit Feedback</Link>
          </Button>
        ) : (
          <Button
            variant="accent"
            className="!pointer-events-auto"
            disabled
            title="Only the author can edit a feedback"
          >
            Edit Feedback
          </Button>
        )}
      </div>
      {/* Feedback Card */}
      <FeedbackItem feedback={feedback} isAuthenticated={isAuthenticated} />
      {/* Comments */}
      <CommentList
        feedbackId={feedbackId}
        comments={feedback.comments}
        count={feedback._count.comments}
        isAuthenticated={isAuthenticated}
      />
      <CommentForm feedbackId={feedbackId} isAuthenticated={isAuthenticated} />
    </div>
  );
}
