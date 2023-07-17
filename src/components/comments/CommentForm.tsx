"use client";

import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Props = {
  feedbackId: string;
  isAuthenticated: boolean;
};

export default function CommentForm({ feedbackId, isAuthenticated }: Props) {
  /* Form Hook */
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ content: string }>({});

  /* Router */
  const router = useRouter();

  /* Calculated Fields */
  const textLength = watch("content", "").length;
  const remainingText = Math.max(250 - textLength, 0);

  /* Functions */
  const onSubmit = async ({ content }: { content: string }) => {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
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
  };

  /* JSX */
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
          placeholder={
            isAuthenticated
              ? "Type your comment here"
              : "Please login to comment"
          }
          disabled={!isAuthenticated}
        />
        {errors?.content !== undefined && (
          <p className="mt-1 text-sm text-red">
            {errors?.content?.message?.toString()}
          </p>
        )}
        <div className="mt-4 flex justify-between">
          <span>{remainingText} Characters left</span>
          <Button variant="default" type="submit" disabled={!isAuthenticated}>
            Post Comment
          </Button>
        </div>
      </form>
    </Card>
  );
}
