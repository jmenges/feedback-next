import Author from "@/components/comments/Author";
import CommentReplyForm from "@/components/comments/CommentReplyForm";
import { Button } from "@/components/ui/button";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ReplyPopulated } from "@/types/comments";
import { IReply } from "@/types/types";
import React from "react";

type Props = {
  reply: ReplyPopulated;
  commentId: number;
  feedbackId: number;
};

export default function CommentReply({
  reply: { content, author, replyingToUser },
  commentId,
  feedbackId,
}: Props) {
  /* States */
  const [showReplyForm, setShowReplyForm] = React.useState(false);

  /* Functions */
  const hideShowReplyForm = () => {
    setShowReplyForm(false);
  };

  /* JSX */
  return (
    <>
      {/* Reply */}
      <div className="my-6 ml-6 tablet:my-8">
        {/* Header with Author and Reply Button  */}
        <div className="mb-4 flex items-center justify-between">
          <Author author={author} />
          <Button
            variant="link"
            className="text-xs text-blue hover:text-blue/80"
            size="raw"
            onClick={() => setShowReplyForm((prev) => !prev)}
          >
            Reply
          </Button>
        </div>
        <div className="relative space-y-4 tablet:ml-5 tablet:pl-[50px] tablet:text-sm desktop:text-md">
          <p>
            <span className="mr-1 font-bold text-purple">
              @{replyingToUser?.username}
            </span>
            {content}
          </p>
          {/* Conditionally show reply form */}
          {!!showReplyForm && (
            <CommentReplyForm
              commentId={commentId}
              feedbackId={feedbackId}
              replyingToUserId={author.id}
              onSubmitted={hideShowReplyForm}
            />
          )}
        </div>
      </div>
    </>
  );
}
