"use client";

import FeedbackListSkeleton from "@/app/_components/skeletons/FeedbackListSkeleton";
import { useFeedbacksLoading } from "@/context/FeedbacksLoadingContext";
import React, { useEffect } from "react";

type Props = { children?: React.ReactNode; random: number };

/**
 * This component is used to display the FeedbackListSkeleton component,
 * if the feedbackLoading state is true. This is required because the
 * server component only displays the skeleton component on the first render.
 * When filtering or sorting, the server component reenders only after recieving the new data.
 */
export default function FeedbackListSkeletonRenderer({
  random,
  children,
}: Props) {
  const { feedbacksLoading, setFeedbacksLoading } = useFeedbacksLoading();

  /* Random changes on each render of server component */
  useEffect(() => {
    setFeedbacksLoading(false);
  }, [random]);

  return <>{feedbacksLoading ? <FeedbackListSkeleton /> : <>{children}</>}</>;
}
