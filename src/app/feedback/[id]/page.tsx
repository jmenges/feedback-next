import FeedbackItem from "@/components/FeedbackItem";
import CommentForm from "@/components/comments/CommentForm";
import CommentList from "@/components/comments/CommentList";
import BackButton from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";

export default function FeedbackDetail() {
  return (
    <div className="mt-6 flex flex-col gap-6 tablet:mt-0">
      {/* Actions */}
      <div className="flex justify-between">
        <BackButton variant="link" />{" "}
        <Button variant="accent">Edit Feedback</Button>
      </div>
      {/* Feedback Card */}
      <FeedbackItem />
      {/* Comments */}
      <CommentList />
      <CommentForm />
    </div>
  );
}
