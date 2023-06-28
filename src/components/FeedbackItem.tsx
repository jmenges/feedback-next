import CommentCounter from "@/components/ui/CommentCounter";
import Tag from "@/components/ui/Tag";
import UpvoteButton from "@/components/ui/UpvoteButton";
import React from "react";

type Props = {};

export default function FeedbackItem({}: Props) {
  return (
    <article className="flex flex-wrap items-start rounded-md bg-white p-6 tablet:px-8 tablet:py-7">
      {/* TITLE, DESCRIPTION, TAG */}
      <div className="mb-4 tablet:mb-0 space-y-2 tablet:order-2 w-full tablet:w-auto">
        <h4 className="tablet:text-h3">Add tags for solutions</h4>
        <p className="">Easier to search for solutions based on a specific stack.</p>
        <Tag title="Enhancement" type="info" />
      </div>
      {/* UPVOTE BUTTON */}
        <UpvoteButton className="tablet:order-1 tablet:mr-10" />
        <CommentCounter className="ml-auto tablet:self-center tablet:order-3" count={0} />
      {/* COMMENT COUNT */}
    </article>
  );
}
