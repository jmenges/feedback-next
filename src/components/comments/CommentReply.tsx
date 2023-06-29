import Author from "@/components/comments/Author";
import CommentReplyForm from "@/components/comments/CommentReplyForm";
import { Button } from "@/components/ui/button";
import { IReply } from "@/types";
import React from "react";

type Props = {
  reply: IReply;
};

export default function CommentReply({
  reply: { user, content, replyingTo },
}: Props) {
  const [showReplyForm, setShowReplyForm] = React.useState(false);

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
          {showReplyForm ? <CommentReplyForm onSubmit={() => {}} /> : null}
        </div>
      </div>
    </>
  );
}
