import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type RoadmapCounterProps = {};

const roadMaps = [
  { title: "Planned", color: "orange" },
  { title: "In-Progress", color: "purple" },
  { title: "Live", color: "bright-blue" },
];

export default function RoadmapCounter({}: RoadmapCounterProps) {
  return (
    <Card>
      <div className="mb-6 flex justify-between">
        <h2>Roadmap</h2>
        <Button size="raw" variant="link" asChild>
          <Link href="/roadmap">View</Link>
        </Button>
      </div>
      {/* ROADMAPS */}
      <div className="space-y-2">
        {roadMaps.map((roadMap, index) => (
          <div key={index} className="flex items-center">
            <i className={`mr-2 h-2 w-2 rounded-full bg-${roadMap.color}`} />
            <span className="mr-auto">{roadMap.title}</span>
            <span className="font-bold">9</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
