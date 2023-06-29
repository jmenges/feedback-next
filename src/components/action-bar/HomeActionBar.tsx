import FeedbackSorter from "@/components/FeedbackSorter";

import IconSuggestions from "@/../public/icons/icon-suggestions.svg";
import BaseActionBar from "@/components/action-bar/BaseActionBar";

type Props = {
  feedbackCount: number;
};

export default function HomeActionBar({ feedbackCount = 0 }: Props) {
  return (
    <BaseActionBar>
      <div className="hidden text-h3 mr-8 font-bold text-white tablet:flex">
        <IconSuggestions />
        <span className="ml-4">{feedbackCount} Suggestions</span>
      </div>
      <FeedbackSorter />
    </BaseActionBar>
  );
}
