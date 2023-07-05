import { initialFeedbacks } from "@/data/initialFeedbacks";
import {
  IAddComment,
  IAddFeedback,
  IComments,
  IEditFeedback,
  IFeedback,
} from "@/types";
import React from "react";

type Props = {};

interface IFeedbackStore {
  feedbacks: IFeedback[];
  addFeedback: (feedback: IAddFeedback) => number | null;
  editFeedback: (feedback: IFeedback) => boolean;
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
  const [nextId, setNextId] = React.useState<number>(
    initialFeedbacks[initialFeedbacks.length - 1].id + 1
  );

  /**
   * Function definitions
   */
  const addFeedback = (feedback: IAddFeedback) => {
    const feedbackId = nextId;

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

    setNextId((prev) => prev + 1);
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

  // useEffect(()=>{
  //   console.log("useEffect in useFeedbackStore")
  //   console.log(feedbacks)
  // },[feedbacks])

  return {
    feedbacks,
    addFeedback,
    editFeedback,
    removeFeedback,
    upvoteFeedback,
    addComment,
  };
};
