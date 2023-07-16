import Card from "@/app/_components/Card";
import Tag from "@/app/_components/ui/Category";
import CommentCounter from "@/app/_components/ui/CommentCounter";
import UpvoteButton from "@/app/_components/ui/UpvoteButton";
import { roadmaps } from "@/data/roadmaps";
import { cn } from "@/lib/utils";
import {
  FeedbackPopulated,
  FeedbackPopulatedAuthenticated,
} from "@/types/feedbacks";

type Props = {
  feedback: FeedbackPopulated | FeedbackPopulatedAuthenticated;
  className?: string;
  indicateState?: boolean;
  isAuthenticated: boolean;
};

const getStatusColor = (status: string) => {
  return roadmaps.find(
    (roadmap) => roadmap.title.toLowerCase() === status.toLowerCase()
  )?.color;
};

export default function RoadmapItem({
  feedback,
  className,
  indicateState,
  isAuthenticated,
}: Props) {
  let classNameColor = "";
  if (indicateState === true) {
    const { status } = feedback;
    const statusColor = getStatusColor(status);
    classNameColor = `border-t-[6px] border-${statusColor}`;
  }

  let isUpvoted = false;
  if ("upvotes" in feedback) {
    isUpvoted = feedback.upvotes.length > 0;
  }

  return (
    <Card
      className={cn("flex flex-wrap items-start", className, classNameColor)}
    >
      {/* TITLE, DESCRIPTION, TAG */}
      <div className="mb-4 w-full space-y-2">
        <h4 className="tablet:text-h3">{feedback.title}</h4>
        <p className="!mb-6 desktop:mb-4">{feedback.description}</p>
        <Tag title={feedback.category} type="info" />
      </div>
      {/* UPVOTE BUTTON */}
      <UpvoteButton
        upvoteCount={feedback._count.upvotes}
        size="small"
        className=""
        isUpvoted={isUpvoted}
        feedbackId={feedback.id}
        isAuthenticated={isAuthenticated}
      />
      <CommentCounter className="ml-auto" count={feedback._count.comments} />
      {/* COMMENT COUNT */}
    </Card>
  );
}
