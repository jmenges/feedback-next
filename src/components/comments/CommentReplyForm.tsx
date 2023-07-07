import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  onSubmit: ({ content }: { content: string }) => void;
};

export default function CommentReplyForm({ onSubmit }: Props) {
  const { register, handleSubmit } = useForm<{ content: string }>({});

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-fu flex flex-1 flex-wrap justify-between gap-4"
    >
      <Textarea
        {...register("content")}
        className="flex-1"
        placeholder="Type your comment here"
      />
      <Button type="submit" className="flex-shrink-0" variant="default">
        Post Reply
      </Button>
    </form>
  );
}
