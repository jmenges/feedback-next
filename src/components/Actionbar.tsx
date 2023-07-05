import FeedbackSorter from "@/components/FeedbackSorter";
import AddFeedbackButton from "@/components/ui/AddFeedbackButton";

import IconSuggestions from "@/../public/icons/icon-suggestions.svg";
import { SortOptionValue, SortOptions } from "@/hooks/useSortFeedbacks";
import { Dispatch } from "react";

type Props = {
  feedbackCount: number;
  sortOptions: SortOptions;
  activeSortOption: SortOptionValue;
  setActiveSortOption: Dispatch<SortOptionValue>;
};

export default function ActionBar({
  feedbackCount = 0,
  sortOptions,
  activeSortOption,
  setActiveSortOption,
}: Props) {
  return (
    <div className="flex h-14 items-center bg-darker-blue px-6 py-2 tablet:h-24 tablet:rounded-md">
      <div className="mr-8 hidden text-h3 font-bold text-white tablet:flex">
        <IconSuggestions />
        <span className="ml-4">{feedbackCount} Suggestions</span>
      </div>
      <FeedbackSorter
        sortOptions={sortOptions}
        activeSortOption={activeSortOption}
        setActiveSortOption={setActiveSortOption}
      />
      <AddFeedbackButton className="ml-auto" />
    </div>
  );
}
