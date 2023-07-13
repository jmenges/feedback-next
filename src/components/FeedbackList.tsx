import FeedbackItem from "@/components/FeedbackItem";
import { cn } from "@/lib/utils";
import {
  FeedbackPopulated,
  FeedbackPopulatedAuthenticated,
} from "@/types/feedbacks";
import Link from "next/link";

type Props = {
  feedbacks: FeedbackPopulated[] | FeedbackPopulatedAuthenticated[];
  isAuthenticated: boolean;
  className?: string;
};

export default function FeedbackList({
  feedbacks,
  isAuthenticated,
  className,
}: Props) {
  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      {feedbacks.map((feedback) => (
        <Link key={feedback.id} href={`/feedback/${feedback.id}`}>
          <FeedbackItem feedback={feedback} isAuthenticated={isAuthenticated} />
        </Link>
      ))}
    </div>
  );
}
