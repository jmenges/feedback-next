import FeedbackItem from "@/app/_components/FeedbackItem";
import { cn } from "@/lib/utils";
import { Feedback } from "@/models/feedback";
import { CategoryValue } from "@/types/categories";
import {
  FeedbackPopulated,
  FeedbackPopulatedAuthenticated,
} from "@/types/feedbacks";
import { SortOptionValue } from "@/types/sortOptions";
import { User } from "next-auth";
import Link from "next/link";
import React from "react";

type Props = {
  // feedbacks: FeedbackPopulated[] | FeedbackPopulatedAuthenticated[];
  user?: User;
  validCategory?: CategoryValue;
  validSortOption?: SortOptionValue;
  isAuthenticated: boolean;
  className?: string;
};

export default async function FeedbackList({
  // feedbacks,
  user,
  validCategory,
  validSortOption,
  isAuthenticated,
  className,
}: Props) {
  const feedbacks = await Feedback.queryAll({
    category: validCategory,
    sort: validSortOption,
    authUserId: user?.id,
  });

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
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
    </div>
  );
}
