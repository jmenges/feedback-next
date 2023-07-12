import Actionbar from "@/components/Actionbar";
import FeedbackList from "@/components/FeedbackList";
import NavBar from "@/components/NavBar";
import { categories } from "@/data/categories";
import { sortOptions } from "@/data/sortOptions";
import { getServerUser } from "@/lib/server";
import { Feedback } from "@/models/feedback";

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

  /* Execute query */
  const feedbacks = await Feedback.queryAll({
    category: validCategory,
    sort: validSortOption,
    authUserId: user?.id,
  });

  /* Calculated values */
  const feedbackCount = feedbacks.length;

  /* JSX */
  return (
    <div className="flex flex-wrap tablet:gap-6">
      <NavBar
        isAuthenticated={isAuthenticated}
        // roadmapCounts={roadmapCounts}
      />
      <main className="mt-[80px] flex-grow tablet:mt-0">
        <header className="mb-4 tablet:mb-6">
          <Actionbar
            feedbackCount={feedbackCount}
            isAuthenticated={isAuthenticated}
          />
        </header>
        <FeedbackList isAuthenticated={isAuthenticated} feedbacks={feedbacks} />
      </main>
    </div>
  );
}
