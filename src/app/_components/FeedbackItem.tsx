import Card from "@/app/_components/Card";
import Category from "@/app/_components/ui/Category";
import CommentCounter from "@/app/_components/ui/CommentCounter";
import UpvoteButton from "@/app/_components/ui/UpvoteButton";
import { cn } from "@/lib/utils";
import {
  FeedbackFullyPopulated,
  FeedbackFullyPopulatedAuthenticated,
  FeedbackPopulated,
  FeedbackPopulatedAuthenticated,
} from "@/types/feedbacks";

type Props = {
  feedback:
    | FeedbackPopulated
    | FeedbackPopulatedAuthenticated
    | FeedbackFullyPopulated
    | FeedbackFullyPopulatedAuthenticated;
  className?: string;
  isAuthenticated: boolean;
};

export default function FeedbackItem({
  feedback,
  className,
  isAuthenticated,
}: Props) {
  let isUpvoted = false;
  if ('upvotes' in feedback ){
    isUpvoted = feedback.upvotes.length > 0;
  }

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
        isUpvoted={isUpvoted}
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
