import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  onSubmit: (comment: string) => void;
};

export default function CommentReplyForm({ onSubmit }: Props) {
  return (
    <div className="flex flex-1 justify-between">
      <Input className="w-3/4" placeholder="Type your comment here" />
      <Button variant="default">Post Reply</Button>
    </div>
  );
}
