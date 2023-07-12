import Card from "@/components/Card";
import Category from "@/components/ui/Category";
import CommentCounter from "@/components/ui/CommentCounter";
import UpvoteButton from "@/components/ui/UpvoteButton";
import { cn } from "@/lib/utils";
import { FeedbackFullyPopulated, FeedbackPopulated } from "@/types/feedbacks";
import { Feedback } from "@prisma/client";

type Props = {
  feedback: Feedback | FeedbackPopulated | FeedbackFullyPopulated;
  className?: string;
  isAuthenticated: boolean;
};

export default function FeedbackItem({
  feedback,
  className,
  isAuthenticated,
}: Props) {
  return (
    <Card className={cn("flex flex-wrap items-start", className)}>
      {/* TITLE, DESCRIPTION, TAG */}
      <div className="mb-4 w-full space-y-2 tablet:order-2 tablet:mb-0 tablet:w-auto">
        <h4 className="tablet:text-h3">{feedback.title}</h4>
        <p className="">{feedback.description}</p>
        <Category title={feedback.category} type="info" />
      </div>
      {/* UPVOTE BUTTON */}
      <UpvoteButton
        upvoteCount={feedback._count.upvotes}
        isUpvoted={feedback.upvotes.length > 0}
        feedbackId={feedback.id}
        className="tablet:order-1 tablet:mr-10"
        isAuthenticated={isAuthenticated}
      />
      <CommentCounter
        className="ml-auto tablet:order-3 tablet:self-center"
        count={feedback._count.comments}
      />
      {/* COMMENT COUNT */}
    </Card>
  );
}
