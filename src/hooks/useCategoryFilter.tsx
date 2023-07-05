import { ICategory, categories } from "@/data/categories";
import { IFeedback } from "@/types";
import { useEffect, useState } from "react";

export default function useCategoryFilter(feedbacks: IFeedback[]) {
  const [activeCategory, setActiveCategory] = useState<ICategory>();
  const [filteredFeedbacks, setFilteredFeedbacks] =
    useState<IFeedback[]>(feedbacks);

  /**
   * Handle filtering
   */
  useEffect(() => {
    setFilteredFeedbacks(
      activeCategory === undefined
        ? feedbacks
        : feedbacks.filter(
            (feedback) =>
              feedback.category.toLowerCase() === activeCategory!.toLowerCase()
          )
    );
  }, [feedbacks, activeCategory]);

  return {
    filteredFeedbacks,
    categories: categories,
    activeCategory,
    setActiveCategory,
  };
}
