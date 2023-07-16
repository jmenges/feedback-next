import RoadmapList from "@/app/_components/RoadmapList";
import RoadmapActionBar from "@/app/_components/action-bar/RoadmapActionBar";
import { roadmaps } from "@/data/roadmaps";
import { getRoadmapCounts, getServerUser } from "@/lib/server";
import { Feedback } from "@/models/feedback";

const validStatus = roadmaps.map((roadmap) => roadmap.title.toLowerCase());

export default async function Roadmap() {
  /* Get auth user */
  const user = await getServerUser();
  const isAuthenticated = user !== undefined;

  /* Execute query */
  const feedbacks = await Feedback.queryAll({
    authUserId: user?.id,
  });

  /* Calculated values based on query results */
  const feedbacksWithRelevantStatus = feedbacks?.filter((feedback) =>
    validStatus.includes(feedback.status)
  );
  const { counts: roadmapCounts } = !!feedbacks
    ? getRoadmapCounts({ feedbacks })
    : { counts: [] };

  return (
    <div className="flex flex-wrap gap-6">
      <main className="flex-grow">
        <header className="">
          <RoadmapActionBar isAuthenticated={isAuthenticated} />
        </header>
        <RoadmapList
          feedbacks={feedbacksWithRelevantStatus}
          roadmapCounts={roadmapCounts}
          isAuthenticated={isAuthenticated}
        />
      </main>
    </div>
  );
}
