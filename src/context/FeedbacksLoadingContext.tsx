"use client";

import React from "react";

type FeedbacksLoadingContext = {
  feedbacksLoading: boolean;
  setFeedbacksLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const feedbacksLoadingContext = React.createContext<
  FeedbacksLoadingContext | undefined
>(undefined);

export default function FeedbacksLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [feedbacksLoading, setFeedbacksLoading] =
    React.useState<boolean>(false);

  return (
    <feedbacksLoadingContext.Provider
      value={{ feedbacksLoading, setFeedbacksLoading }}
    >
      {children}
    </feedbacksLoadingContext.Provider>
  );
}

export function useFeedbacksLoading() {
  const context = React.useContext(feedbacksLoadingContext);

  if (context === undefined) {
    throw new Error(
      "useFeedbackLoading must be used within a FeedbackLoadingProvider"
    );
  }

  return context;
}
