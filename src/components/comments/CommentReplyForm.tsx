import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  onSubmit: (comment: string) => void;
};

export default function CommentReplyForm({ onSubmit }: Props) {
  return (
    <div className="flex flex-1 gap-4 justify-between">
      <Input className="" placeholder="Type your comment here" />
      <Button className="flex-shrink-0" variant="default">Post Reply</Button>
    </div>
  );
}
