import FeedbackItem from "@/app/_components/FeedbackItem";
import FeedbackListSkeletonRenderer from "@/app/_components/FeedbackListSkeletonRenderer";
import { cn } from "@/lib/utils";
import { Feedback } from "@/models/feedback";
import { FeedbacksQueryOptions } from "@/types/feedbacks";
import Link from "next/link";

type Props = {
  isAuthenticated: boolean;
  feedbacksQueryOptions?: FeedbacksQueryOptions;
  className?: string;
};

export default async function FeedbackList({
  isAuthenticated,
  feedbacksQueryOptions,
  className,
}: Props) {
  const feedbacks = await Feedback.queryAll({
    ...feedbacksQueryOptions,
  });

  // Random value to force rerender of DisableFeedbackLoadingOnRender
  const random = Math.random();

  return (
    <>
      <div className={cn("flex flex-col space-y-4", className)}>
        <FeedbackListSkeletonRenderer random={random}>
          {!!feedbacks && (
            <>
              {feedbacks.map((feedback) => (
                <Link key={feedback.id} href={`/feedback/${feedback.id}`}>
                  <FeedbackItem
                    feedback={feedback}
                    isAuthenticated={isAuthenticated}
                  />
                </Link>
              ))}
            </>
          )}
        </FeedbackListSkeletonRenderer>
      </div>
    </>
  );
}
