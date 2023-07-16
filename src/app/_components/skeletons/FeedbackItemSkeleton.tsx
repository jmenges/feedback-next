import Card from "@/app/_components/Card";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

export default function FeedbackItemSkeleton({}: Props) {
  return (
    <Card className={cn("flex flex-wrap items-start")}>
      {/* TITLE, DESCRIPTION, TAG */}
      <div className="mb-4 w-full space-y-2 tablet:order-2 tablet:mb-0 tablet:w-auto">
        <Skeleton className="h-[20px] w-[160px] tablet:w-[220px] tablet:h-[26px] max-w-full"></Skeleton>
        <Skeleton className="h-[19px] w-full tablet:h-[23px] tablet:w-[360px] max-w-[400px]" />
        <Skeleton className="h-[27px] w-[70px] rounded-md"></Skeleton>
      </div>
      {/* BUTTON Skeleton */}
      <Skeleton className="h-[27px] w-[60px] rounded-md tablet:mr-10 tablet:h-[61px] tablet:w-[42.5px]" />
      {/* COMMENT COUNT */}
      <Skeleton className="ml-auto h-[27px] tablet:h-[31px] w-[40px] tablet:order-3 tablet:self-center" />
    </Card>
  );
}
