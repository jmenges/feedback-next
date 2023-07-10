import EditFeedbackForm from "@/components/feedback-form/EditFeedbackForm";
import BackButton from "@/components/ui/BackButton";
import { Feedback } from "@/models/feedback";
import { headers } from "next/headers";

/* TODO: validate auth and role */
export default async function EditFeedback({
  params: { id },
}: {
  params: { id: string };
}) {
  /* Constants */
  const feedbackId: number = Number(id);

  /* Run query */
  const feedback = await Feedback.getById({
    id: feedbackId,
    includeRelations: false,
  });

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
