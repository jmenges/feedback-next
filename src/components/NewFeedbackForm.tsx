import React from "react";
import IconNewFeedback from "@/../public/icons/icon-new-feedback.svg";
import FeedbackForm from "@/components/FeedbackForm";
import { Button } from "@/components/ui/button";

type Props = {};

const FeedbackActions = () => {
  return (
    <>
      <Button className="w-full">Post Feedback</Button>
      <Button className="w-full" variant="secondary">
        Cancel
      </Button>
    </>
  );
};

export default function NewFeedbackForm({}: Props) {
  return (
    <FeedbackForm
      Icon={IconNewFeedback}
      title="Create New Feedback"
      buttons={[FeedbackActions]}
    />
  );
}
