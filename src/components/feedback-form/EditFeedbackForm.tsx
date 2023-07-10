"use client";

import IconEditFeedback from "@/../public/icons/icon-edit-feedback.svg";
import { Button } from "@/components/ui/button";
import { IEditFeedback } from "@/types/types";
import { Feedback } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FeedbackForm from "./FeedbackForm";

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

type EditFeedbackFormProps = { feedback: Feedback; returnHref: string };

export default function EditFeedbackForm({
  feedback,
  returnHref,
}: EditFeedbackFormProps) {
  /* Router hook */
  const router = useRouter();

  // /**
  //  * Side effects
  //  */
  // const feedback = useMemo<IEditFeedback | undefined>(() => {
  //   const feedback = getFeedbackById(feedbackId);
  //   const inputFeedback: IEditFeedback | undefined =
  //     feedback !== null
  //       ? {
  //           id: feedback.id,
  //           title: feedback.title,
  //           status: feedback.status,
  //           description: feedback.description,
  //           category: feedback.category,
  //         }
  //       : undefined;
  //   return inputFeedback;
  // }, [feedbacks, feedbackId]);

  /**
   * Functions
   */
  const onSubmit = (data: IEditFeedback) => {
    // const isSuccess = editFeedback(data);
    // console.log(isSuccess);
    // if (isSuccess === true) {
    //   router.push(returnHref);
    // }
  };

  const onDelete = async () => {
    if (feedback === undefined) return;

    const res = await fetch(`/api/feedback/${feedback.id}`, {
      method: "DELETE",
    });

    if (res.status !== 200) {
      const error = await res.json();
      console.error(error);
      return;
    }

    /* Success */
    router.push("/");
  };

  /* JSX */
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
