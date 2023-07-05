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
  return (
    <Card className={cn("flex flex-wrap items-start", className)}>
      {/* TITLE, DESCRIPTION, TAG */}
      <div className="mb-4 w-full space-y-2 tablet:order-2 tablet:mb-0 tablet:w-auto">
        <h4 className="tablet:text-h3">{feedback.title}</h4>
        <p className="">{feedback.description}</p>
        <Tag title={feedback.category} type="info" />
      </div>
      {/* UPVOTE BUTTON */}
      <UpvoteButton
        upvoteCount={feedback.upvotes}
        onClick={() => {
          upvoteFeedback(feedback.id);
        }}
        className="tablet:order-1 tablet:mr-10"
      />
      <CommentCounter
        className="ml-auto tablet:order-3 tablet:self-center"
        count={Array.isArray(feedback.comments) ? feedback.comments.length : 0}
      />
      {/* COMMENT COUNT */}
    </Card>
  );
}
