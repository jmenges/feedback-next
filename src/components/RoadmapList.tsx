"use client";

import RoadmapItem from "@/components/RoadmapItem";
import RoadmapMobileStatusNav from "@/components/RoadmapMobileStatusNav";
import { roadmaps } from "@/config";
import { cn } from "@/lib/utils";
import { IFeedback } from "@/types";
import { useState } from "react";

type Props = { feedbacks: IFeedback[] };

export default function RoadmapList({ feedbacks }: Props) {
  const [mobileActiveStatusIndex, setMobileActiveStatusIndex] = useState(0);
  const statusCounts = feedbacks.map(feedback => feedback.status)
  let acc = statusCounts.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map());
  console.log(acc)


  return (
    <div className="flex flex-col overflow-hidden">
      {/* Roadmap list */}
      <RoadmapMobileStatusNav
        activeIndex={mobileActiveStatusIndex}
        setActiveIndex={setMobileActiveStatusIndex}
      />
      <div className="flex h-[calc(100vh-174px)] overflow-y-scroll pt-6 tablet:mb-6 tablet:mt-8 tablet:h-auto tablet:w-full tablet:gap-[10px] tablet:overflow-y-auto desktop:mb-8 desktop:mt-12 desktop:gap-[30px]">
        {roadmaps.map((roadmap, index) => (
          <>
            {/* On mobile the columns are shown based on the current selected status categroy (mobileActiveStatusIndex) */}
            <div
              key={index}
              className={cn(
                "px-6 tablet:block tablet:w-1/3 tablet:px-0",
                index !== mobileActiveStatusIndex ? "hidden" : ""
              )}
            >
              {/* Headers rows */}
              <h3 className="text-h3 tablet:text-h4 desktop:text-h3">
                {roadmap.title} (TBD)
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
                    <RoadmapItem
                      key={feedback.id}
                      feedback={feedback}
                      indicateState
                    />
                  ))}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
