import FeedbackForm from "@/components/FeedbackForm";
import NewFeedbackForm from "@/components/NewFeedbackForm";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";

export default function NewFeedback() {
  return (
    <div className="mt-6 flex flex-col gap-6 tablet:mt-0">
      {/* Actions */}
      <div className="flex justify-between mb-10">
        <BackButton variant="link" />{" "}
      </div>
      {/* Feedback Form */}
      <NewFeedbackForm />
    </div>
  );
}
