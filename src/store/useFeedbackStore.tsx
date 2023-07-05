import { initialFeedbacks } from "@/data/initialFeedbacks";
import {
  IAddComment,
  IAddFeedback,
  IComments,
  IEditFeedback,
  IFeedback,
} from "@/types";
import React, { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

type Props = {};

interface IFeedbackStore {
  feedbacks: IFeedback[];
  getById: (feedbackId: number) => IFeedback | null;
  addFeedback: (feedback: IAddFeedback) => number | null;
  editFeedback: (feedback: IEditFeedback) => boolean;
  removeFeedback: (feedbackId: number) => boolean;
  upvoteFeedback: (feedbackId: number) => boolean;
  addComment: (feedbackId: number, comment: IAddComment) => boolean;
}

export const useFeedbackStore = (): IFeedbackStore => {
  /**
   * State definitions
   */
  const [feedbacks, setFeedbacks] =
    React.useState<IFeedback[]>(initialFeedbacks);

  /**
   * We temporary use local storage to share state between different pages
   * This will be replaced by Zustand
   */
  const [localFeedbacks, setLocalFeedbacks] = useLocalStorage<IFeedback[]>(
    "feedbacks",
    []
  );

  // on first execution load from storage
  useEffect(() => {
    if (localFeedbacks.length === 0) return;
    setFeedbacks(localFeedbacks);
  }, []);

  /**
   * Function definitions
   */
  const getById = (feedbackId: number) => {
    return feedbacks.find((feedback) => feedback.id === feedbackId) || null;
  };

  const addFeedback = (feedback: IAddFeedback) => {
    const feedbackId = getNextId();

    setFeedbacks((prev) => {
      return [
        ...prev,
        {
          id: feedbackId,
          upvotes: 0,
          ...feedback,
        },
      ];
    });

    return feedbackId;
  };

  const removeFeedback = (feedbackId: number) => {
    const exists = feedbacks.find((feedback) => feedback.id === feedbackId);
    if (!exists) return false;

    setFeedbacks((prev) => {
      return prev.filter((feedback) => feedback.id !== feedbackId);
    });
    return true;
  };

  const editFeedback = (editedFeedback: IEditFeedback) => {
    const exists = feedbacks.find(
      (feedback) => feedback.id === editedFeedback.id
    );
    if (!exists) return false;

    setFeedbacks((prev) => {
      return prev.map((feedback) => {
        if (feedback.id === editedFeedback.id) {
          return {
            ...feedback,
            ...editedFeedback,
          };
        }
        return feedback;
      });
    });
    return true;
  };

  const getNextId = (): number => {
    return (
      feedbacks.reduce((prev, current) => {
        return prev.id > current.id ? prev : current;
      }).id + 1
    );
  };

  const upvoteFeedback = (feedbackId: number) => {
    const exists = feedbacks.find((feedback) => feedback.id === feedbackId);
    if (!exists) return false;

    setFeedbacks((prev) => {
      return prev.map((feedback) => {
        if (feedback.id === feedbackId) {
          return {
            ...feedback,
            upvotes: feedback.upvotes + 1,
          };
        }
        return feedback;
      });
    });

    return true;
  };

  const addComment = (feedbackId: number, comment: IAddComment) => {
    const exists = feedbacks.find((feedback) => feedback.id === feedbackId);
    if (!exists) return false;

    setFeedbacks((prev) => {
      return prev.map((feedback) => {
        if (feedback.id === feedbackId) {
          const hasComments = feedback?.comments?.length ?? 0 > 0;
          const newComments = hasComments
            ? feedback.comments!
            : ([] as IComments);

          return {
            ...feedback,
            comments: [
              ...newComments,
              {
                id: newComments.length + 1,
                content: comment.content,
                user: comment.user,
              },
            ],
          };
        }
        return feedback;
      });
    });
    return true;
  };

  useEffect(() => {
    setLocalFeedbacks(feedbacks);
  }, [feedbacks]);

  return {
    feedbacks,
    getById,
    addFeedback,
    editFeedback,
    removeFeedback,
    upvoteFeedback,
    addComment,
  };
};
