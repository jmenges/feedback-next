"use client";

import RoadmapItem from "@/components/RoadmapItem";
import RoadmapMobileStatusNav from "@/components/RoadmapMobileStatusNav";
import { roadmaps } from "@/data/roadmaps";
import useRoadmapCount from "@/hooks/useRoadmapCount";
import { cn } from "@/lib/utils";
import { IFeedback } from "@/types";
import Link from "next/link";
import { useState } from "react";

type Props = { feedbacks: IFeedback[]; upvoteFeedback: (id: number) => void };

export default function RoadmapList({ feedbacks, upvoteFeedback }: Props) {
  const [mobileActiveStatusIndex, setMobileActiveStatusIndex] = useState(0);
  const { counts: roadmapCounts } = useRoadmapCount({ feedbacks });

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Roadmap list */}
      <RoadmapMobileStatusNav
        activeIndex={mobileActiveStatusIndex}
        setActiveIndex={setMobileActiveStatusIndex}
      />
      <div className="flex h-[calc(100vh-174px)] overflow-y-scroll pt-6 tablet:mb-6 tablet:mt-8 tablet:h-auto tablet:w-full tablet:gap-[10px] tablet:overflow-y-auto desktop:mb-8 desktop:mt-12 desktop:gap-[30px]">
        {/* On mobile the columns are shown based on the current selected status categroy (mobileActiveStatusIndex) */}
        {roadmaps.map((roadmap, index) => {
          const count =
            roadmapCounts.find((count) => count.title === roadmap.title)
              ?.count || 0;

          return (
            <div
              key={index}
              className={cn(
                "px-6 tablet:block tablet:w-1/3 tablet:px-0",
                index !== mobileActiveStatusIndex ? "hidden" : ""
              )}
            >
              {/* Headers rows */}
              <h3 className="text-h3 tablet:text-h4 desktop:text-h3">
                {roadmap.title} ({count})
              </h3>
              <p className="mb-6 tablet:text-h4 desktop:mb-8 desktop:text-md">
                {roadmap.description}
              </p>
              {/* Content rows*/}
              <div className="space-y-4 desktop:space-y-6">
                {feedbacks
                  .filter(
                    (feedback) =>
                      feedback.status.toLowerCase() ===
                      roadmap.title.toLocaleLowerCase()
                  )
                  .map((feedback) => (
                    <Link href={`/feedback/${feedback.id}`} key={feedback.id}>
                      <RoadmapItem
                        upvoteFeedback={upvoteFeedback}
                        feedback={feedback}
                        indicateState
                      />
                    </Link>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
