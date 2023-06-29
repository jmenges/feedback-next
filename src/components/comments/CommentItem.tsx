"use client";

import Author from "@/components/comments/Author";
import CommentReply from "@/components/comments/CommentReply";
import CommentReplyForm from "@/components/comments/CommentReplyForm";
import { Button } from "@/components/ui/button";
import { IComment } from "@/types";
import React from "react";

type CommentItemProps = {
  comment: IComment;
};

export default function CommentItem({
  comment: { id, user, content, replies },
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = React.useState(false);

  const hasReplies = Array.isArray(replies) && replies.length > 0;

  return (
    <div>
      {/* Comment */}
      <div className="my-6 tablet:my-8">
        {/* Header with Author and Reply Button  */}
        <div className="mb-4 flex items-center justify-between">
          <Author author={user} />
          <Button
            onClick={() => setShowReplyForm((prev) => !prev)}
            variant="link"
            className="text-xs text-blue hover:text-blue/80"
            size="raw"
          >
            Reply
          </Button>
        </div>
        <div className="relative space-y-4 tablet:ml-5 tablet:pl-[50px] tablet:text-sm desktop:text-md">
          <p
            className={
              hasReplies
                ? "before:absolute before:left-0 before:top-0 tablet:before:block tablet:before:h-[180%] before:border-l before:border-grey"
                : ""
            }
          >
            {content}
          </p>
          {/* Conditionally show reply form */}
          {showReplyForm ? <CommentReplyForm onSubmit={() => {}} /> : null}
        </div>
      </div>
      {/* Replies */}
      {hasReplies ? (
        <div className="tablet:before relative before:absolute before:block before:h-[70%] before:border-l before:border-grey tablet:pl-5">
          {replies.map((reply, index) => (
            <CommentReply key={index} reply={reply} />
          ))}
        </div>
      ) : null}
    </div>
  );
}