import FeedbackItem from "@/components/FeedbackItem";
import CommentForm from "@/components/comments/CommentForm";
import CommentList from "@/components/comments/CommentList";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { genBackLinkServer, getServerSessionUser } from "@/lib/server";
import { Feedback } from "@/models/feedback";
import Link from "next/link";

export default async function FeedbackDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  /* Constants */
  const feedbackId: number = Number(id);

  /* Get auth user */
  const user = await getServerSessionUser();

  /* Run query */
  const feedback = await Feedback.getById({
    id: feedbackId,
    authUserId: user?.id,
    includeRelations: true,
  });

  const isOwner = feedback?.authorId === user?.id;
  // console.log(feedback.comments?.map((comments) => comments.replies));

  /* Get back path */
  const backPath = genBackLinkServer(`/feedback/${id}`);

  /* Exit conditions */
  if (!feedback) return;

  /* JSX */
  return (
    <div className="mt-6 flex flex-col gap-6 tablet:mt-0">
      {/* Actions */}
      <div className="flex justify-between">
        <BackButton variant="link" href={backPath} />

        {isOwner ? (
          <Button variant="accent" asChild>
            <Link href={`/feedback/${id}/edit`}>Edit Feedback</Link>
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
      <FeedbackItem feedback={feedback} />
      {/* Comments */}
      <CommentList
        feedbackId={feedbackId}
        comments={feedback.comments}
        count={feedback._count.comments}
      />
      <CommentForm feedbackId={feedbackId} />
    </div>
  );
}
