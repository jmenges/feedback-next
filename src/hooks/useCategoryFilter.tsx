import { categories } from "@/data/categories";
import { ICategory, IFeedback } from "@/types";
import { useEffect, useState } from "react";

export default function useCategoryFilter(feedbacks: IFeedback[]) {
  const [activeCategory, setActiveCategory] = useState<ICategory>("All");
  const [filteredFeedbacks, setFilteredFeedbacks] =
    useState<IFeedback[]>(feedbacks);

  /**
   * Handle filtering
   */
  useEffect(() => {
    setFilteredFeedbacks(
      activeCategory === "All"
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
