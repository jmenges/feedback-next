import FeedbackSorter from "@/components/FeedbackSorter";
import AddFeedbackButton from "@/components/ui/AddFeedbackButton";

import IconSuggestions from "@/../public/icons/icon-suggestions.svg";

type Props = {
  feedbackCount: number;
};

export default function ActionBar({ feedbackCount = 0 }: Props) {
  return (
    <div className="flex h-14 items-center bg-darker-blue px-6 py-2">
      <div className="hidden text-h3 mr-8 font-bold text-white tablet:flex">
        <IconSuggestions />
        <span className="ml-4">{feedbackCount} Suggestions</span>
      </div>
      <FeedbackSorter />
      <AddFeedbackButton className="ml-auto" />
    </div>
  );
}
