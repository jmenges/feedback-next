import { initialFeedbacks } from "@/config";
import { IFeedback } from "@/types";
import React, { Dispatch, use, useEffect, useState } from "react";

export type UseSortFeedbacks = {
  sortedFeedbacks: IFeedback[];
  options: SortOptions;
  activeOption: SortOptionValue;
  setActiveOption: Dispatch<SortOptionValue>;
};

export type SortOptionValue =
  | "upvotes-desc"
  | "upvotes-asc"
  | "comments-desc"
  | "comments-asc";

export type SortOptions = readonly {
  name: string;
  value: SortOptionValue;
}[];

export const sortOptions: SortOptions = [
  {
    name: "Most Upvotes",
    value: "upvotes-desc",
  },
  {
    name: "Least Upvotes",
    value: "upvotes-asc",
  },
  {
    name: "Most Comments",
    value: "comments-desc",
  },
  {
    name: "Least Comments",
    value: "comments-asc",
  },
] as const;

export default function useSortFeedbacks(
  feedbacks: IFeedback[]
): UseSortFeedbacks {
  const [activeOption, setActiveOption] =
    useState<SortOptionValue>("upvotes-desc");
  const [sortedFeedbacks, setSortedFeedbacks] =
    useState<IFeedback[]>(feedbacks);

  /**
   * Handle sorting based on change of sort option
   */
  useEffect(() => {
    if (feedbacks === undefined) return;

    let sortedFeedbacks;
    switch (activeOption) {
      case "upvotes-desc":
        sortedFeedbacks = [...feedbacks.sort((a, b) => b.upvotes - a.upvotes)];
        break;
      case "upvotes-asc":
        sortedFeedbacks = [...feedbacks.sort((a, b) => a.upvotes - b.upvotes)];
        break;
      case "comments-desc":
        sortedFeedbacks = [
          ...feedbacks.sort(
            (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)
          ),
        ];
        break;
      case "comments-asc":
        sortedFeedbacks = [
          ...feedbacks.sort(
            (a, b) => (a.comments?.length || 0) - (b.comments?.length || 0)
          ),
        ];
      default:
        sortedFeedbacks = [...feedbacks];
    }

    setSortedFeedbacks(sortedFeedbacks);
  }, [feedbacks, activeOption]);

  /**
   * DEBUG
   */
  // useEffect(() => {
  //   console.log("feedbacks: ", feedbacks);
  //   console.log("activeOption: ", activeOption);
  //   console.log("sortedFeedbacks: ", sortedFeedbacks);
  // }, [activeOption, sortedFeedbacks]);

  return {
    sortedFeedbacks,
    options: sortOptions,
    activeOption,
    setActiveOption,
  };
}