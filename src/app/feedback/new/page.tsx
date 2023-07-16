import BackToMainRouteButton from "@/app/_components/BackToMainRouteButton";
import NewFeedbackForm from "@/app/_components/feedback-form/NewFeedbackForm";

export default function NewFeedback() {
  return (
    <div className="flex flex-col gap-6">
      {/* Actions */}
      <div className="mb-10 flex justify-between">
        <BackToMainRouteButton />
      </div>
      {/* Feedback Form */}
      <NewFeedbackForm />
    </div>
  );
}
