"use client";

import Actionbar from "@/components/Actionbar";
import AppCard from "@/components/AppCard";
import CategoryFilter from "@/components/CategoryFilter";
import FeedbackList from "@/components/FeedbackList";
import RoadmapCounter from "@/components/RoadmapCounter";
import useCategoryFilter from "@/hooks/useCategoryFilter";
import useSortFeedbacks from "@/hooks/useSortFeedbacks";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import { useEffect } from "react";

export default function Home() {
  /**
   * Custom hooks
   */
  const { feedbacks, upvoteFeedback } = useFeedbackStore();
  const { filteredFeedbacks, activeCategory, setActiveCategory } =
    useCategoryFilter(feedbacks);
  const { sortedFeedbacks, options, activeOption, setActiveOption } =
    useSortFeedbacks(filteredFeedbacks);

  /**
   * Side effects
   */
  useEffect(() => {
    console.log("home")
    console.log("feedbacks: ", feedbacks) 
    console.log("sortedFeedbacksd: ", sortedFeedbacks);
  }, [feedbacks, sortedFeedbacks]);

  /**
   * Calculated values
   */
  const feedbackCount = filteredFeedbacks.length;

  return (
    <div className="flex flex-wrap gap-6">
      <aside className="w-full space-y-6 desktop:w-1/4">
        <AppCard />
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <RoadmapCounter />
      </aside>
      <main className="flex-grow">
        <header className="mb-4 tablet:mb-6">
          <Actionbar
            feedbackCount={feedbackCount}
            sortOptions={options}
            activeSortOption={activeOption}
            setActiveSortOption={setActiveOption}
          />
        </header>
        <FeedbackList
          feedbacks={sortedFeedbacks}
          upvoteFeedback={upvoteFeedback}
        />
      </main>
    </div>
  );
}
