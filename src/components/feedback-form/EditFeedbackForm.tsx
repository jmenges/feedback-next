import React from "react";
import IconEditFeedback from "@/../public/icons/icon-edit-feedback.svg";
import FeedbackForm from "./FeedbackForm";
import { Button } from "@/components/ui/button";
import { IFeedbackPartial } from "@/types";
import Link from "next/link";

type EditFeedbackFormProps = { feedback: IFeedbackPartial; cancelHref: string };

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

export default function EditFeedbackForm({ feedback, cancelHref }: EditFeedbackFormProps) {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FeedbackForm
      onSubmit={onSubmit}
      feedback={feedback}
      Icon={IconEditFeedback}
      title="Editing ‘Add a dark theme option’"
      Actions={() => <FeedbackActions cancelHref={cancelHref} />}
    />
  );
}
