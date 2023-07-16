"use client";

import { Button } from "@/app/_components/ui/button";
import { roadmaps } from "@/data/roadmaps";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

export default function RoadmapMobileStatusNav({activeIndex, setActiveIndex}: Props) {

  return (
    <div className="tablet:hidden flex border-b border-grey">
      {roadmaps.map((roadmap, index) => (
        <Button
          key={roadmap.value}
          variant="raw"
          size="raw"
          onClick={() => setActiveIndex(index)}
          className={cn(
            "w-1/3 border-b-4 border-transparent py-[20px]",
            activeIndex === index ? "border-purple text-darker-blue" : ""
          )}
        >
          {roadmap.title}
        </Button>
      ))}
    </div>
  );
}
