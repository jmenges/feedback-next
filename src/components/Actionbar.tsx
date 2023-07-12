import FeedbackSorter from "@/components/FeedbackSorter";
import AddFeedbackButton from "@/components/ui/AddFeedbackButton";

import IconSuggestions from "@/../public/icons/icon-suggestions.svg";

type Props = {
  feedbackCount: number;
  isAuthenticated: boolean;
};

export default function ActionBar({
  feedbackCount = 0,
  isAuthenticated,
}: Props) {
  return (
    <div className="flex h-14 items-center bg-darker-blue px-6 py-2 tablet:h-24 tablet:rounded-md">
      <div className="mr-8 hidden text-h3 font-bold text-white tablet:flex">
        <IconSuggestions />
        <span className="ml-4">{feedbackCount} Suggestions</span>
      </div>
      <FeedbackSorter />
      <AddFeedbackButton className="ml-auto" disabled={!isAuthenticated} disabledMessage="Login to add a new feedback" />
    </div>
  );
}
