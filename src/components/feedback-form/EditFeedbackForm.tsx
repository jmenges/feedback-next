import React from "react";
import IconEditFeedback from "@/../public/icons/icon-edit-feedback.svg";
import FeedbackForm from "./FeedbackForm";
import { Button } from "@/components/ui/button";
import { IFeedbackPartial } from "@/types";

type Props = {feedback: IFeedbackPartial};

const FeedbackActions = () => {
  return (
    <>
      <Button className="w-full">Save Changes</Button>
      <Button className="w-full" variant="secondary">
        Cancel
      </Button>
      <Button className="w-full" variant="destructive">
        Delete
      </Button>
    </>
  );
};

export default function EditFeedbackForm({feedback}: Props) {
  return (
    <FeedbackForm
      feedback={feedback}
      Icon={IconEditFeedback}
      title="Editing ‘Add a dark theme option’"
      Actions={FeedbackActions}
    />
  );
}
