import NewFeedbackForm from "@/components/feedback-form/NewFeedbackForm";
import BackButton from "@/components/ui/BackButton";

import { headers } from "next/headers";

export default function NewFeedback() {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const referer = headersList.get("referer");
  const path = referer?.split(domain)[1] || "";
  const backPath = path === "/feedback/new" ? "/" : path;

  return (
    <div className="flex flex-col gap-6">
      {/* Actions */}
      <div className="mb-10 flex justify-between">
         <BackButton variant="link" href={backPath} />
      </div>
      {/* Feedback Form */}
      <NewFeedbackForm cancelHref={backPath}/>
    </div>
  );
}
