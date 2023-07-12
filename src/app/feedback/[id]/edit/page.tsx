import EditFeedbackForm from "@/components/feedback-form/EditFeedbackForm";
import BackButton from "@/components/ui/BackButton";
import { getServerUser } from "@/lib/server";
import { Feedback } from "@/models/feedback";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/* TODO: validate auth and role */
export default async function EditFeedback({
  params: { id: feedbackId },
}: {
  params: { id: string };
}) {
  /* Run query */
  const feedback = await Feedback.getById({
    id: feedbackId,
    includeRelations: false,
  });
  /* Redirect, if feedback does not exist*/
  if (!feedback) redirect("/");

  /* Get auth user */
  const user = await getServerUser();
  const isOwner = feedback?.authorId === user?.id;

  /* Redirect if user is not author*/
  if (!isOwner) redirect("/");

  /* Generate back links */
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const referer = headersList.get("referer");
  const path = referer?.split(domain)[1] || "";
  const backPath = path === "" || path.endsWith("/edit") ? "/" : path;

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
