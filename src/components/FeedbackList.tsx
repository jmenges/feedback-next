"use client";

import FeedbackItem from "@/components/FeedbackItem";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import React from "react";

type Props = {};

export default function FeedbackList({}: Props) {
  const { feedbacks } = useFeedbackStore();

  return (
    <div className="space-y-4">
      {feedbacks.map((feedback) => (
        <FeedbackItem key={feedback.id} feedback={feedback} />
      ))}
    </div>
  );
}
