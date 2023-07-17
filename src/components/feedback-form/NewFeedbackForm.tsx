"use client";

import IconNewFeedback from "@/../public/icons/icon-new-feedback.svg";
import FeedbackForm from "@/components/feedback-form/FeedbackForm";
import { Button } from "@/components/ui/button";
import useLastMainRoute from "@/hooks/useLastMainRoute";
import { FeedbackAdd } from "@/types/feedbacks";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function NewFeedbackForm() {
  const router = useRouter();
  const { lastMainRoute } = useLastMainRoute();

  const onSubmit = async (data: FeedbackAdd) => {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const res = await fetch("/api/feedback", postOptions);

    if (res.status !== 200) {
      const error = await res.json();
      console.error(error);
      return;
    }

    router.push(lastMainRoute);
    router.refresh();
  };

  return (
    <FeedbackForm
      onSubmit={onSubmit}
      Icon={IconNewFeedback}
      title="Create New Feedback"
      Actions={() => <FeedbackActions cancelHref={lastMainRoute} />}
    />
  );
}
