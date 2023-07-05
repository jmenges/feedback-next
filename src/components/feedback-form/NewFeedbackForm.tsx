"use client";

import React from "react";
import IconNewFeedback from "@/../public/icons/icon-new-feedback.svg";
import FeedbackForm from "@/components/feedback-form/FeedbackForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import { useRouter } from "next/navigation";
import { IAddFeedback } from "@/types";

type Props = {
  cancelHref: string;
};

const FeedbackActions = ({ cancelHref }: { cancelHref: string }) => {
  return (
    <>
      <Button type="submit" className="w-full">
        Post Feedback
      </Button>
      <Button className="w-full" variant="secondary" asChild>
        <Link href={cancelHref}>Cancel</Link>
      </Button>
    </>
  );
};

export default function NewFeedbackForm({ cancelHref }: Props) {
  const { addFeedback } = useFeedbackStore();
  const router = useRouter();

  const onSubmit = (data:IAddFeedback) => {
    const id = addFeedback(data);
    if (id !== null) {
      router.push(cancelHref);
    }
  };

  return (
    <FeedbackForm
      onSubmit={onSubmit}
      Icon={IconNewFeedback}
      title="Create New Feedback"
      Actions={() => <FeedbackActions cancelHref={cancelHref} />}
    />
  );
}
