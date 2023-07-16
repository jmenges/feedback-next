import FeedbackSorter from "@/app/_components/FeedbackSorter";

import IconSuggestions from "@/../public/icons/icon-suggestions.svg";
import BaseActionBar from "@/app/_components/action-bar/BaseActionBar";

type HomeActionBarProps = {
  isAuthenticated: boolean;
  feedbackCount: number;
};

export default function HomeActionBar({
  isAuthenticated,
  feedbackCount = 0,
}: HomeActionBarProps) {
  return (
    <BaseActionBar isAuthenticated={isAuthenticated}>
      <div className="mr-8 hidden text-h3 font-bold text-white tablet:flex">
        <IconSuggestions />
        <span className="ml-4">{feedbackCount} Suggestions</span>
      </div>
      <FeedbackSorter />
    </BaseActionBar>
  );
}
