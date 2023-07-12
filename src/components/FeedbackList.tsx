import FeedbackItem from "@/components/FeedbackItem";
import { FeedbackPopulated } from "@/types/feedbacks";
import Link from "next/link";

type Props = {
  feedbacks: FeedbackPopulated[];
  isAuthenticated: boolean;
};

export default function FeedbackList({ feedbacks, isAuthenticated }: Props) {
  return (
    <div className="flex flex-col space-y-4 p-6 tablet:p-0">
      {feedbacks.map((feedback) => (
        <Link key={feedback.id} href={`/feedback/${feedback.id}`}>
          <FeedbackItem feedback={feedback} isAuthenticated={isAuthenticated} />
        </Link>
      ))}
    </div>
  );
}
