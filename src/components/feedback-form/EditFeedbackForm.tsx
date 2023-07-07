"use client";

import IconEditFeedback from "@/../public/icons/icon-edit-feedback.svg";
import { Button } from "@/components/ui/button";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import { IEditFeedback } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import FeedbackForm from "./FeedbackForm";

type EditFeedbackFormProps = { feedbackId: number; returnHref: string };

const FeedbackActions = ({
  cancelHref,
  onDelete,
}: {
  cancelHref: string;
  onDelete: () => void;
}) => {
  return (
    <>
      <Button type="submit" className="w-full">
        Save Changes
      </Button>
      <Button className="w-full" variant="secondary" asChild>
        <Link href={cancelHref}>Cancel</Link>
      </Button>
      <Button
        type="button"
        onClick={onDelete}
        className="w-full"
        variant="destructive"
      >
        Delete
      </Button>
    </>
  );
};

export default function EditFeedbackForm({
  feedbackId,
  returnHref,
}: EditFeedbackFormProps) {
  /**
   * Custom hooks
   */
  const {
    feedbacks,
    getById: getFeedbackById,
    removeFeedback,
    editFeedback,
  } = useFeedbackStore();

  /**
   * Hooks
   */
  const router = useRouter();

  /**
   * Side effects
   */
  const feedback = useMemo<IEditFeedback | undefined>(() => {
    const feedback = getFeedbackById(feedbackId);
    const inputFeedback: IEditFeedback | undefined =
      feedback !== null
        ? {
            id: feedback.id,
            title: feedback.title,
            status: feedback.status,
            description: feedback.description,
            category: feedback.category,
          }
        : undefined;
    return inputFeedback;
  }, [feedbacks, feedbackId]);

  /**
   * Functions
   */
  const onSubmit = (data: IEditFeedback) => {
    const isSuccess = editFeedback(data);
    console.log(isSuccess);
    if (isSuccess === true) {
      router.push(returnHref);
    }
  };

  const onDelete = () => {
    if (feedback === undefined) return;
    const isRemoved = removeFeedback(feedback.id);
    if (isRemoved) {
      router.push("/");
    }
  };

  if (feedback === undefined) return <div>Feedback not found</div>;

  /**
   * JSX
   */
  return (
    <FeedbackForm
      feedback={feedback}
      title={feedback?.title || ""}
      Icon={IconEditFeedback}
      Actions={() => (
        <FeedbackActions cancelHref={returnHref} onDelete={onDelete} />
      )}
      onSubmit={onSubmit}
    />
  );
}
