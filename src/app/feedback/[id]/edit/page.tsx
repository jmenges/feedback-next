import EditFeedbackForm from "@/app/_components/feedback-form/EditFeedbackForm";
import BackButton from "@/app/_components/ui/BackButton";
import { getServerUser } from "@/lib/server";
import { Feedback } from "@/models/feedback";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function EditFeedback({
  params: { id: feedbackId },
}: {
  params: { id: string };
}) {
  /* Get auth user */
  const user = await getServerUser();

  /* Run query */
  const feedback = await Feedback.getById({
    id: feedbackId,
    authUserId: user?.id,
  });
  const isOwner = feedback?.authorId === user?.id;

  /* Redirect, if feedback does not exist*/
  if (!feedback) redirect("/");
  /* Redirect if user is not author*/
  if (!isOwner) redirect("/");

  /* Generate back link */
  const backPath = `/feedback/${feedbackId}`;

  /* JSX */
  return (
    <div className="mt-6 flex flex-col gap-6 tablet:mt-0">
      {/* Actions */}
      <div className="mb-10 flex justify-between">
        <BackButton variant="link" href={backPath} />
      </div>
      {/* Feedback Form */}
      <EditFeedbackForm feedback={feedback} returnHref={backPath} />
    </div>
  );
}
