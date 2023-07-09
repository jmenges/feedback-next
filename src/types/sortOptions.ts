import { sortOptions } from "@/data/sortOptions";

export type SortOptions = readonly SortOption[];
export type SortOption = {
  readonly label: string;
  readonly value: string;
};

export type SortOptionValue = (typeof sortOptions)[number]["value"];
