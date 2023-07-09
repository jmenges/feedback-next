import Author from "@/components/comments/Author";
import CommentReplyForm from "@/components/comments/CommentReplyForm";
import { Button } from "@/components/ui/button";
import useCurrentUser from "@/hooks/useCurrentUser";
import { IReply } from "@/types/types";
import React from "react";

type Props = {
  reply: IReply;
  feedbackId: number;
  commentId: number;
  addReply: ({
    feedbackId,
    commentId,
    reply,
  }: {
    feedbackId: number;
    commentId: number;
    reply: IReply;
  }) => boolean;
};

export default function CommentReply({
  reply: { user: replyUser, content, replyingTo },
  feedbackId,
  commentId,
  addReply,
}: Props) {
  /**
   * States
   */
  const [showReplyForm, setShowReplyForm] = React.useState(false);

  /**
   * Hooks
   */
  const { user } = useCurrentUser();

  /**
   * Functions
   */
  const replyOnSubmit = (data) => {
    console.log(data);

    const newReply: IReply = {
      replyingTo: replyUser.username,
      content: data.content,
      user,
    };

    console.log(addReply({ feedbackId, commentId, reply: newReply }));
  };

  return (
    <>
      {/* Reply */}
      <div className="my-6 ml-6 tablet:my-8">
        {/* Header with Author and Reply Button  */}
        <div className="mb-4 flex items-center justify-between">
          <Author author={user} />
          <Button
            variant="link"
            className="text-xs text-blue hover:text-blue/80"
            size="raw"
            onClick={() => setShowReplyForm((prev) => !prev)}
          >
            Reply
          </Button>
        </div>
        {/* <p className="tablet:ml-5 tablet:pl-[50px] tablet:text-sm desktop:text-md">
          <span className="mr-1 font-bold text-purple">@{replyingTo}</span>
          {content}
        </p> */}
        <div className="relative space-y-4 tablet:ml-5 tablet:pl-[50px] tablet:text-sm desktop:text-md">
          <p>
            <span className="mr-1 font-bold text-purple">@{replyingTo}</span>
            {content}
          </p>
          {/* Conditionally show reply form */}
          {showReplyForm ? <CommentReplyForm onSubmit={replyOnSubmit} /> : null}
        </div>
      </div>
    </>
  );
}
