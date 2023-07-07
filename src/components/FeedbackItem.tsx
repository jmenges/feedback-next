import Card from "@/components/Card";
import CommentCounter from "@/components/ui/CommentCounter";
import Tag from "@/components/ui/Category";
import UpvoteButton from "@/components/ui/UpvoteButton";
import { cn } from "@/lib/utils";
import { IFeedback } from "@/types";

type Props = {
  feedback: IFeedback;
  className?: string;
  upvoteFeedback: (feedbackId: number) => boolean;
};

export default function FeedbackItem({
  feedback,
  className,
  upvoteFeedback,
}: Props) {
  /**
   * Calculated values
   */
  const replyCount =
    feedback.comments?.reduce((acc, curr) => {
      return acc + (curr.replies?.length || 0);
    }, 0) || 0;
  const commentCount = (feedback.comments?.length || 0) + replyCount;

  return (
    <Card className={cn("flex items-start", className)}>
      {/* TITLE, DESCRIPTION, TAG */}
      <div className="mb-4 w-full space-y-2 tablet:order-2 tablet:mb-0 tablet:w-auto">
        <h4 className="tablet:text-h3">{feedback.title}</h4>
        <p className="">{feedback.description}</p>
        <Tag title={feedback.category} type="info" />
      </div>
      {/* UPVOTE BUTTON */}
      <UpvoteButton
        upvoteCount={feedback.upvotes}
        onClick={(e) => {
          upvoteFeedback(feedback.id);
          e.stopPropagation();
          e.preventDefault();
        }}
        className="tablet:order-1 tablet:mr-10"
      />
      <CommentCounter
        className="ml-auto tablet:order-3 tablet:self-center"
        count={commentCount}
      />
      {/* COMMENT COUNT */}
    </Card>
  );
}
