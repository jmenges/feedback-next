import Card from "@/app/_components/Card";
import { Button } from "@/app/_components/ui/button";
import { roadmaps } from "@/data/roadmaps";
import Link from "next/link";
import React from "react";

type RoadmapCounterProps = {
  counts: {
    title: string;
    count: number;
  }[];
  className?: string;
};

export default function RoadmapCounter({
  counts,
  className,
}: RoadmapCounterProps) {
  return (
    <Card className={className}>
      <div className="mb-6 flex justify-between gap-6">
        <h2>Roadmap</h2>
        <Button size="raw" variant="link" asChild>
          <Link href="/roadmap">View</Link>
        </Button>
      </div>
      {/* ROADMAPS */}
      <div className="space-y-2">
        {roadmaps.map((roadmap, index) => {
          const count = counts.find(
            (count) => count.title === roadmap.value
          )?.count;

          return (
            <div key={index} className="flex items-center">
              <i className={`mr-2 h-2 w-2 rounded-full bg-${roadmap.color}`} />
              <span className="mr-auto">{roadmap.title}</span>
              <span className="font-bold">{count}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
