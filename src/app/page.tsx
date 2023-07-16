import FeedbackList from "@/app/_components/FeedbackList";
import NavBar from "@/app/_components/NavBar";
import HomeActionBar from "@/app/_components/action-bar/HomeActionBar";
import { categories } from "@/data/categories";
import { sortOptions } from "@/data/sortOptions";
import { getServerUser } from "@/lib/server";
import { Feedback } from "@/models/feedback";
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
  // const isAuthenticated = user?.id !== undefined
  const isAuthenticated = user?.id !== undefined;

  /* Execute queries */
  const feedbacks = await Feedback.queryAll({
    category: validCategory,
    sort: validSortOption,
    authUserId: user?.id,
  });
  const dbRoadmapCounts = await Feedback.getRoadmapCounts();

  /* Calculated values */
  const feedbackCount = feedbacks?.length || 0;
  const roadmapCounts = dbRoadmapCounts.map((roadmapCount) => ({
    title: roadmapCount.status,
    count: roadmapCount._count.status,
  }));

  /* JSX */
  return (
    <div className="flex flex-wrap tablet:gap-6">
      <NavBar user={user} roadmapCounts={roadmapCounts} />
      <main className="mt-[80px] flex-grow tablet:mt-0">
        <div className="tablet:mb-6">
          <HomeActionBar
            feedbackCount={feedbackCount}
            isAuthenticated={isAuthenticated}
          />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <FeedbackList
            className="overflow-y-auto p-6  pt-8 max-tablet:h-[calc(100vh-136px)] tablet:p-0"
            validCategory={validCategory}
            validSortOption={validSortOption}
            isAuthenticated={isAuthenticated}
          />
        </Suspense>
      </main>
    </div>
  );
}
