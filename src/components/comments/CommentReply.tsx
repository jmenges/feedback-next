import Author from "@/components/comments/Author";
import { Button } from "@/components/ui/button";
import { IReply } from "@/types";
import React from "react";

type Props = {
  reply: IReply;
};

export default function CommentReply({
  reply: { user, content, replyingTo },
}: Props) {
  return (
    <>
      {/* Reply */}
      <div className="my-6 tablet:my-8 ml-6">
        {/* Header with Author and Reply Button  */}
        <div className="mb-4 flex items-center justify-between">
          <Author author={user} />
          <Button variant="link" className="text-blue hover:text-blue/80 text-xs" size="raw">
            Reply
          </Button>
        </div>
        <p className="tablet:ml-5 tablet:pl-[50px] tablet:text-sm desktop:text-md">
          <span className="mr-1 font-bold text-purple">@{replyingTo}</span>
          {content}
        </p>
      </div>
    </>
  );
}
