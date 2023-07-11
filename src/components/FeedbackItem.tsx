import Card from "@/components/Card";
import Category from "@/components/ui/Category";
import CommentCounter from "@/components/ui/CommentCounter";
import UpvoteButton from "@/components/ui/UpvoteButton";
import { cn } from "@/lib/utils";
import { FeedbackPopulated } from "@/types/feedbacks";

type Props = {
  feedback: FeedbackPopulated;
  className?: string;
};

export default function FeedbackItem({
  feedback,
  className,
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
        className="tablet:order-1 tablet:mr-10"
      />
      <CommentCounter
        className="ml-auto tablet:order-3 tablet:self-center"
        count={feedback._count.comments}
      />
      {/* COMMENT COUNT */}
    </Card>
  );
}
