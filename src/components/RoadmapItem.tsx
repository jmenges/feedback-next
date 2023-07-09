import Card from "@/components/Card";
import CommentCounter from "@/components/ui/CommentCounter";
import Tag from "@/components/ui/Category";
import UpvoteButton from "@/components/ui/UpvoteButton";
import { cn } from "@/lib/utils";
import { IFeedback } from "@/types/types";
import React from "react";
import { roadmaps } from "@/data/roadmaps";

type Props = {
  feedback: IFeedback;
  className?: string;
  indicateState?: boolean;
  upvoteFeedback: (id: number) => void;
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
  upvoteFeedback,
}: Props) {
  let classNameColor = "";
  if (indicateState === true) {
    const { status } = feedback;
    const statusColor = getStatusColor(status);
    classNameColor = `border-t-[6px] border-${statusColor}`;
  }

  const onUpvoteClick = (event) => {
    upvoteFeedback(feedback.id);
    event.stopPropagation();
    event.preventDefault();
  };

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
        onClick={onUpvoteClick}
        upvoteCount={feedback.upvotes}
        size="small"
        className=""
      />
      <CommentCounter
        className="ml-auto"
        count={Array.isArray(feedback.comments) ? feedback.comments.length : 0}
      />
      {/* COMMENT COUNT */}
    </Card>
  );
}
