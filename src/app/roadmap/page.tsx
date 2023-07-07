"use client";

import RoadmapList from "@/components/RoadmapList";
import RoadmapActionBar from "@/components/action-bar/RoadmapActionBar";
import { roadmaps } from "@/data/roadmaps";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import { useMemo } from "react";

const validStatus = roadmaps.map((roadmap) => roadmap.title.toLowerCase());

export default function Roadmap() {
  const { feedbacks, upvoteFeedback } = useFeedbackStore();
  const feedbacksWithRelevantStatus = useMemo(
    () => feedbacks.filter((feedback) => validStatus.includes(feedback.status)),
    [feedbacks]
  );

  return (
    <div className="flex flex-wrap gap-6">
      <main className="flex-grow tablet:space-y-4">
        <header className="">
          <RoadmapActionBar />
        </header>
        <RoadmapList upvoteFeedback={upvoteFeedback} feedbacks={feedbacksWithRelevantStatus} />
      </main>
    </div>
  );
}
