import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Props = {
  commentId: number;
  feedbackId: number;
  replyingToUserId: number;
  onSubmitted: () => void;
};

export default function CommentReplyForm({
  commentId,
  feedbackId,
  replyingToUserId,
  onSubmitted,
}: Props) {
  /* Form hook */
  const { register, handleSubmit, reset } = useForm<{ content: string }>({});

  /* Router hook */
  const router = useRouter();

  /* Functions */
  const onSubmit = async ({ content }: { content: string }) => {
    const reply = {
      content,
      replyingToCommentId: commentId,
      replyingToUserId,
    };
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reply),
    };
    const res = await fetch(
      `/api/feedback/${feedbackId}/comments`,
      postOptions
    );

    if (res.status !== 200) {
      const json = res.json();
      console.log(json);
      return;
    }

    /* Success */
    router.refresh();
    reset();
    onSubmitted();
  };

  /* JSX */
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
