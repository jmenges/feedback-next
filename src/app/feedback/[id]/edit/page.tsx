import EditFeedbackForm from "@/components/feedback-form/EditFeedbackForm";
import BackButton from "@/components/ui/BackButton";

export default function NewFeedback() {
  return (
    <div className="mt-6 flex flex-col gap-6 tablet:mt-0">
      {/* Actions */}
      <div className="flex justify-between mb-10">
        <BackButton variant="link" />{" "}
      </div>
      {/* Feedback Form */}
      <EditFeedbackForm />
    </div>
  );
}
