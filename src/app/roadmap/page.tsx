import RoadmapList from "@/components/RoadmapList";
import RoadmapActionBar from "@/components/action-bar/RoadmapActionBar";
import { initialFeedbacks } from "@/data/initialFeedbacks";
import { roadmaps } from "@/data/roadmaps";

const validStatus = roadmaps.map((roadmap) => roadmap.title.toLowerCase());
const feedbacksWithRelevantStatus = initialFeedbacks.filter((feedback) =>
  validStatus.includes(feedback.status)
);

export default function Roadmap() {
  return (
    <div className="flex flex-wrap gap-6">
      <main className="flex-grow tablet:space-y-4">
        <header className="">
          <RoadmapActionBar />
        </header>
        <div>
          <RoadmapList feedbacks={feedbacksWithRelevantStatus} />
        </div>
      </main>
    </div>
  );
}
