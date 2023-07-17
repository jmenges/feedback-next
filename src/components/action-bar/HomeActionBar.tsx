import FeedbackSorter from "@/components/FeedbackSorter";

import IconSuggestions from "@/../public/icons/icon-suggestions.svg";
import FeedbackQueryAllCount from "@/components/FeedbackQueryAllCount";
import BaseActionBar from "@/components/action-bar/BaseActionBar";
import { FeedbacksQueryOptions } from "@/types/feedbacks";
import { Suspense } from "react";

type HomeActionBarProps = {
  isAuthenticated: boolean;
  feedbacksQueryOptions?: FeedbacksQueryOptions;
};

export default async function HomeActionBar({
  isAuthenticated,
  feedbacksQueryOptions,
}: HomeActionBarProps) {
  return (
    <BaseActionBar isAuthenticated={isAuthenticated}>
      <div className="mr-8 hidden text-h3 font-bold text-white tablet:flex">
        <IconSuggestions />
        <span className="ml-4">
          <Suspense fallback={<span>... </span>}>
            <FeedbackQueryAllCount
              feedbacksQueryOptions={feedbacksQueryOptions}
            />
          </Suspense>
          Suggestions
        </span>
      </div>
      <FeedbackSorter />
    </BaseActionBar>
  );
}
