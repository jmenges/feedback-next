import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOptions, SortOptionValue } from "@/hooks/useSortFeedbacks";
import React, { Dispatch } from "react";

type Props = {
  sortOptions: SortOptions;
  activeSortOption: SortOptionValue;
  setActiveSortOption: Dispatch<SortOptionValue>;
};

export default function FeedbackSorter({
  sortOptions,
  activeSortOption,
  setActiveSortOption,
}: Props) {
  const onValueChange = (value: SortOptionValue) => {
    setActiveSortOption(value);
  };

  return (
    <Select onValueChange={onValueChange} defaultValue={activeSortOption}>
      <SelectTrigger className="relative inline-flex max-w-[180px] border-none bg-transparent text-xs text-white shadow-none focus:ring-0 tablet:text-h4">
        Sort by:
        <SelectValue />
      </SelectTrigger>
      <SelectContent sideOffset={14}>
        {sortOptions.map((option, index) => (
          <SelectItem key={index} value={option.value}>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
