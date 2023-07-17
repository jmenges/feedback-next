import FeedbackList from "@/components/FeedbackList";
import NavBar from "@/components/NavBar";
import HomeActionBar from "@/components/action-bar/HomeActionBar";
import FeedbackListSkeleton from "@/components/skeletons/FeedbackListSkeleton";
import FeedbacksLoadingProvider from "@/context/FeedbacksLoadingContext";
import { categories } from "@/data/categories";
import { sortOptions } from "@/data/sortOptions";
import { getServerUser } from "@/lib/server";
import { Feedback } from "@/models/feedback";
import { FeedbacksQueryOptions } from "@/types/feedbacks";
import { Suspense } from "react";

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
  /* Parse and verify search params: TBD replace with zod */
  const queryParamCategory = searchParams["category"] as string;
  const validCategory = categories.find(
    (category) => category.value === queryParamCategory
  )?.value;

  const queryParamSort = searchParams["sort"];
  const validSortOption = sortOptions.find(
    (option) => option.value === queryParamSort
  )?.value;

  /* Get auth user */
  const user = await getServerUser();

  const feedbacksQueryOptions: FeedbacksQueryOptions = {
    category: validCategory,
    sort: validSortOption,
    authUserId: user?.id,
  };

  /* Execute queries */
  const dbRoadmapCounts = await Feedback.getRoadmapCounts();

  /* Calculated values */
  const roadmapCounts = dbRoadmapCounts.map((roadmapCount) => ({
    title: roadmapCount.status,
    count: roadmapCount._count.status,
  }));
  const isAuthenticated = user?.id !== undefined;

  /* JSX */
  return (
    <div className="flex flex-wrap tablet:gap-6">
      <FeedbacksLoadingProvider>
        <NavBar user={user} roadmapCounts={roadmapCounts} />
        <main className="mt-[80px] flex-grow tablet:mt-0">
          <div className="tablet:mb-6">
            <HomeActionBar
              isAuthenticated={isAuthenticated}
              feedbacksQueryOptions={feedbacksQueryOptions}
            />
          </div>
          {/* Fallback is shown during intitial render */}
          <Suspense
            fallback={
              <FeedbackListSkeleton className="overflow-y-auto p-6  pt-8 max-tablet:h-[calc(100vh-136px)] tablet:p-0" />
            }
          >
            <FeedbackList
              className="overflow-y-auto p-6  pt-8 max-tablet:h-[calc(100vh-136px)] tablet:p-0"
              isAuthenticated={isAuthenticated}
              feedbacksQueryOptions={feedbacksQueryOptions}
            />
          </Suspense>
        </main>
      </FeedbacksLoadingProvider>
    </div>
  );
}
