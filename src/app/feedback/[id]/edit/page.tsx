import EditFeedbackForm from "@/components/feedback-form/EditFeedbackForm";
import BackButton from "@/components/ui/BackButton";
import { headers } from "next/headers";

export default function EditFeedback({
  params: { id },
}: {
  params: { id: string };
}) {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const referer = headersList.get("referer");
  const path = referer?.split(domain)[1] || "";
  const backPath = path === "" || path.endsWith("/edit") ? "/" : path;

  return (
    <div className="mt-6 flex flex-col gap-6 tablet:mt-0">
      {/* Actions */}
      <div className="mb-10 flex justify-between">
        <BackButton variant="link" href={backPath} />
      </div>
      {/* Feedback Form */}
      <EditFeedbackForm feedbackId={Number(id)} returnHref={backPath} />
    </div>
  );
}
