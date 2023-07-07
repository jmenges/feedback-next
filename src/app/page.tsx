"use client";

import Actionbar from "@/components/Actionbar";
import FeedbackList from "@/components/FeedbackList";
import NavBar from "@/components/NavBar";
import useCategoryFilter from "@/hooks/useCategoryFilter";
import useRoadmapCount from "@/hooks/useRoadmapCount";
import useSortFeedbacks from "@/hooks/useSortFeedbacks";
import { useFeedbackStore } from "@/store/useFeedbackStore";

export default function Home() {
  /**
   * Custom hooks
   */
  const { feedbacks, upvoteFeedback } = useFeedbackStore();
  const { filteredFeedbacks, activeCategory, setActiveCategory } =
    useCategoryFilter(feedbacks);
  const { sortedFeedbacks, options, activeOption, setActiveOption } =
    useSortFeedbacks(filteredFeedbacks);
  const { counts: roadmapCounts } = useRoadmapCount({ feedbacks });

  /**
   * Calculated values
   */
  const feedbackCount = filteredFeedbacks.length;

  return (
    <div className="flex flex-wrap tablet:gap-6">
      <NavBar
        roadmapCounts={roadmapCounts}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <main className="mt-[80px] flex-grow tablet:mt-0">
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
