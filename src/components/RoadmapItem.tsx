import Card from "@/components/Card";
import CommentCounter from "@/components/ui/CommentCounter";
import Tag from "@/components/ui/Tag";
import UpvoteButton from "@/components/ui/UpvoteButton";
import { roadmaps } from "@/config";
import { cn } from "@/lib/utils";
import { IFeedback } from "@/types";
import React from "react";

type Props = {
  feedback: IFeedback;
  className?: string;
  indicateState?: boolean;
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
}: Props) {

  let classNameColor = "";
  if (indicateState === true) {
    const { status } = feedback;
    const statusColor = getStatusColor(status);
    classNameColor = `border-t-[6px] border-${statusColor}`;
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
      <UpvoteButton size="small" className="" />
      <CommentCounter
        className="ml-auto"
        count={Array.isArray(feedback.comments) ? feedback.comments.length : 0}
      />
      {/* COMMENT COUNT */}
    </Card>
  );
}
