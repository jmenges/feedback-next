import Actionbar from "@/components/Actionbar";
import FeedbackList from "@/components/FeedbackList";
import NavBar from "@/components/NavBar";
import useCategoryFilter from "@/hooks/useCategoryFilter";
import useRoadmapCount from "@/hooks/useRoadmapCount";
import useSortFeedbacks from "@/hooks/useSortFeedbacks";
import { db } from "@/lib/server";
import { Feedback, feedbackPopulated } from "@/models/feedback";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import { ICategory } from "@/types/types";

const getFeedbacks = async () => {
  const feedbacks = await db.feedback.findMany({
    include: feedbackPopulated,
  });
  return feedbacks;
};

/**
 * As opposed to the client side implementation,
 * the server side implementation uses queryParams
 * to handle the state of the filter and sort options.
 */
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams["category"] as ICategory;
  const sort = searchParams["sort"];
  const feedbacks = await Feedback.queryAll({category, sort}); 
  console.log(searchParams["category"])


  /**
   * Custom hooks
   */
  // const { feedbacks, upvoteFeedback } = useFeedbackStore();
  // const { filteredFeedbacks, activeCategory, setActiveCategory } =
  //   useCategoryFilter(feedbacks);
  // const { sortedFeedbacks, options, activeOption, setActiveOption } =
  //   useSortFeedbacks(filteredFeedbacks);
  // const { counts: roadmapCounts } = useRoadmapCount({ feedbacks });

  /**
   * Calculated values
   */
  const feedbackCount = feedbacks.length;

  return (
    <div className="flex flex-wrap tablet:gap-6">
      <NavBar
        // roadmapCounts={roadmapCounts}
        // activeCategory={activeCategory}
        // setActiveCategory={setActiveCategory}
      />
      <main className="mt-[80px] flex-grow tablet:mt-0">
        <header className="mb-4 tablet:mb-6">
          {/* <Actionbar
            feedbackCount={feedbackCount}
            sortOptions={options}
            activeSortOption={activeOption}
            setActiveSortOption={setActiveOption}
          /> */}
        </header>
        <FeedbackList
          feedbacks={feedbacks}
          // upvoteFeedback={upvoteFeedback}
        />
      </main>
    </div>
  );
}
