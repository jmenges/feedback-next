import { sortOptions } from "@/data/sortOptions";
import { SortOptionValue, SortOptions } from "@/types/sortOptions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Dispatch, useCallback, useEffect, useMemo, useState } from "react";

export type UseFeedbackSorter = {
  options: SortOptions;
  activeOption: SortOptionValue;
  setActiveOption: Dispatch<SortOptionValue>;
};

export default function useFeedbackSorter(): UseFeedbackSorter {
  /* State */
  const [activeOption, setActiveOption] = useState<SortOptionValue | null>(
    null
  );

  /**
   * Hooks
   */
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /* Calculatations */
  const queryParamSort = useMemo(
    () => searchParams.get("sort"),
    [searchParams]
  );

  /* Set the local state based on the query parameter on initial render */
  useEffect(() => {
    if (queryParamSort !== null) {
      const validOption = sortOptions.find(
        (option) => option.value === queryParamSort.toLowerCase()
      );
      //clear category from query params if invalid
      if (!validOption) {
        setSortQueryString();
        return;
      }

      setActiveOption(validOption.value);
    } else {
      setActiveOption("upvotes-desc");
    }
  }, []);

  /* Set query parameter based on active category */
  useEffect(() => {
    /* Guard clauses */
    if (
      activeOption === null ||
      (!queryParamSort && activeOption === "upvotes-desc") ||
      queryParamSort === activeOption
    )
      return;

    /* Set query parameter based on active category */
    const nextOption = activeOption === "upvotes-desc" ? "" : activeOption;
    setSortQueryString(nextOption);
  }, [activeOption, pathname, queryParamSort]);

  /**
   * Functions
   */
  const setSortQueryString = useCallback(
    (value?: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      if (value) {
        params.set("sort", value);
      } else {
        params.delete("sort");
      }
      router.push(pathname + "?" + params.toString());
    },
    [searchParams, pathname]
  );

  return {
    options: sortOptions,
    activeOption,
    setActiveOption,
  };
}
