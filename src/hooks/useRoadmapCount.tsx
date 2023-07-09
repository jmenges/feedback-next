import { IFeedback } from "@/types/types";
import React, { useMemo } from "react";

type Props = { feedbacks: IFeedback[] };

type RoadmapCount = {
  counts: {
    title: string;
    count: number;
  }[];
};

export default function useRoadmapCount({ feedbacks }: Props): RoadmapCount {
  const counts = useMemo(
    () => [
      {
        title: "Planned",
        count: feedbacks.reduce(
          (acc, curr) => acc + Number(curr.status === "planned"),
          0
        ),
      },
      {
        title: "In-Progress",
        count: feedbacks.reduce(
          (acc, curr) => acc + Number(curr.status === "in-progress"),
          0
        ),
      },
      {
        title: "Live",
        count: feedbacks.reduce(
          (acc, curr) => acc + Number(curr.status === "live"),
          0
        ),
      },
    ],
    [feedbacks]
  );

  return { counts };
}
