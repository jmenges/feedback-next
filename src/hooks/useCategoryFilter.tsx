import { categories } from "@/data/categories";
import { CategoryValue } from "@/types/categories";
import { Feedback } from "@prisma/client";
// import { ICategory, IFeedback } from "@/types/types";
import { useEffect, useState } from "react";

export default function useCategoryFilter(feedbacks: Feedback[]) {
  const [activeCategory, setActiveCategory] = useState<CategoryValue>("all");
  const [filteredFeedbacks, setFilteredFeedbacks] =
    useState<Feedback[]>(feedbacks);

  /**
   * Handle filtering
   */
  useEffect(() => {
    setFilteredFeedbacks(
      activeCategory === "all"
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
