import { cn } from "@/lib/utils";
import React from "react";

type Props = { className?: string };

export default function FeedbackListSkeleton({ className }: Props) {
  return <div className={cn("flex flex-col space-y-4", className)}></div>;
}
