import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

type Props = {
  onSubmit: (comment: string) => void;
};

export default function CommentReplyForm({ onSubmit }: Props) {
  return (
    <div className="flex flex-1 gap-4 flex-wrap justify-between">
      <Textarea className="flex-1" placeholder="Type your comment here" />
      <Button className="flex-shrink-0" variant="default">Post Reply</Button>
    </div>
  );
}
