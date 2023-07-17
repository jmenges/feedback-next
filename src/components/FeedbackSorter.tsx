"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFeedbacksLoading } from "@/context/FeedbacksLoadingContext";
import useFeedbackSorter from "@/hooks/useFeedbackSorter";
import { SortOptionValue } from "@/types/sortOptions";

export default function FeedbackSorter() {
  /* Custom hook */
  const {
    options: sortOptions,
    activeOption,
    setActiveOption,
  } = useFeedbackSorter();

  const {
    setFeedbacksLoading
  } = useFeedbacksLoading();


  /* Change handler */
  const onValueChange = (value: SortOptionValue) => {
    setActiveOption(value);
    setFeedbacksLoading(true);
  };

  /* JSX */
  return (
    <Select onValueChange={onValueChange} defaultValue={activeOption}>
      <SelectTrigger className="relative inline-flex max-w-[180px] border-none bg-transparent text-xs text-white shadow-none focus:ring-0 tablet:text-h4">
        Sort by:
        <SelectValue />
      </SelectTrigger>
      <SelectContent sideOffset={14}>
        {sortOptions.map((option, index) => (
          <SelectItem key={index} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
