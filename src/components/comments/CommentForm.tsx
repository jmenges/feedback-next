import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useCurrentUser from "@/hooks/useCurrentUser";
import { IAddComment } from "@/types/types";
import { useForm } from "react-hook-form";

type Props = {
  feedbackId: number;
  addComment: (feedbackId: number, comment: IAddComment) => boolean;
};

export default function CommentForm({ feedbackId, addComment }: Props) {
  const { user } = useCurrentUser();
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  const textLength = watch("content", "").length;
  const remainingText = Math.max(250 - textLength, 0);

  const onSubmit = (data) => {
    const newComment: IAddComment = {
      content: data.content,
      user,
    };
    const isSuccess = addComment(feedbackId, newComment);
    if (isSuccess) reset();
  };

  return (
    <Card>
      <h2 className="mb-6">Add Comment</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          {...register("content", {
            required: "Can’t be empty",
            maxLength: {
              value: 20,
              message: "Can’t be more than 250 characters",
            },
          })}
          aria-invalid={errors?.content ? true : false}
          className=""
          placeholder="Type your comment here"
        />
        {errors?.content !== undefined && (
          <p className="mt-1 text-sm text-red">
            {errors?.content?.message?.toString()}
          </p>
        )}
        <div className="mt-4 flex justify-between">
          <span>{remainingText} Characters left</span>
          <Button variant="default" type="submit">
            Post Comment
          </Button>
        </div>
      </form>
    </Card>
  );
}
