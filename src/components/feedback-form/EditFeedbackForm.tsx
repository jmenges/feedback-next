"use client";

import IconEditFeedback from "@/../public/icons/icon-edit-feedback.svg";
import { Button } from "@/components/ui/button";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import { IEditFeedback } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FeedbackForm from "./FeedbackForm";

type EditFeedbackFormProps = { feedbackId: number; returnHref: string };

const FeedbackActions = ({ cancelHref }: { cancelHref: string }) => {
  return (
    <>
      <Button type="submit" className="w-full">
        Save Changes
      </Button>
      <Button className="w-full" variant="secondary" asChild>
        <Link href={cancelHref}>Cancel</Link>
      </Button>
      <Button className="w-full" variant="destructive">
        Delete
      </Button>
    </>
  );
};

export default function EditFeedbackForm({
  feedbackId,
  returnHref,
}: EditFeedbackFormProps) {
  const {
    feedbacks,
    getById: getFeedbackById,
    editFeedback,
  } = useFeedbackStore();
  const [feedback, setFeedback] = useState<IEditFeedback | undefined>(
    undefined
  );
  const router = useRouter();

  useEffect(() => {
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
    setFeedback(inputFeedback);
  }, [feedbacks, feedbackId]);

  const onSubmit = (data: IEditFeedback) => {
    const isSuccess = editFeedback(data);
    console.log(isSuccess);
    if (isSuccess === true) {
      router.push(returnHref);
    }
  };

  return (
    <FeedbackForm
      onSubmit={onSubmit}
      feedback={feedback}
      Icon={IconEditFeedback}
      title="Editing ‘Add a dark theme option’"
      Actions={() => <FeedbackActions cancelHref={returnHref} />}
    />
  );
}
