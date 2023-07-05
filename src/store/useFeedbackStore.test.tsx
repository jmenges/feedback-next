import { initialFeedbacks } from "@/data/initialFeedbacks";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import { IAddComment, IAddFeedback } from "@/types";
import { act, renderHook } from "@testing-library/react";

describe("useFeedbackStore", () => {
  test("should return feedbacks", async () => {
    const { result } = renderHook(() => useFeedbackStore());
    expect(result.current.feedbacks.length).toBeGreaterThan(0);
  });
  test("should be equal to initialFeedbacks", async () => {
    const { result } = renderHook(() => useFeedbackStore());
    expect(result.current.feedbacks).toEqual(initialFeedbacks);
  });
  test("should add feedback", async () => {
    const { result } = renderHook(() => useFeedbackStore());
    const store = result.current;

    // add feedback
    const newFeedback: IAddFeedback = {
      title: "New test feedback entry",
      category: "enhancement",
      description: "Testing functionality of adding feedbacks.",
    };
    let newFeedbackId: number | null = 0;
    act(() => (newFeedbackId = store.addFeedback(newFeedback)));

    //test
    expect(newFeedbackId).toBeGreaterThan(0);
    const { feedbacks } = result.current;
    expect(feedbacks.length).toBe(initialFeedbacks.length + 1);
  });

  test("should remove feedback", async () => {
    const { result } = renderHook(() => useFeedbackStore());

    // remove feedback
    let isSuccess = false;
    act(() => (isSuccess = result.current.removeFeedback(1)));

    //test
    expect(isSuccess).toBe(true);
    const { feedbacks } = result.current;
    expect(feedbacks.length).toBe(initialFeedbacks.length - 1);
  });

  test("should edit feedback", async () => {
    const { result } = renderHook(() => useFeedbackStore());
    const store = result.current;

    // remove feedback
    const feedback = store.feedbacks[0];
    const editFeedback = {
      ...feedback,
      title: "New title",
    };

    let isSuccess = false;
    act(() => (isSuccess = store.editFeedback(editFeedback)));

    //test
    const editedFeedback = result.current.feedbacks.find(
      (f) => f.id === feedback.id
    );
    expect(isSuccess).toBe(true);
    expect(editedFeedback?.title).toBe(editFeedback.title);
  });

  test("should upvote feedback", async () => {
    const { result } = renderHook(() => useFeedbackStore());
    const store = result.current;

    const feedback = store.feedbacks[0];
    const upvotes = feedback.upvotes;

    let isSuccess = false;
    act(() => (isSuccess = store.upvoteFeedback(feedback.id)));

    //test
    expect(isSuccess).toBe(true);
    expect(result.current.feedbacks[0].upvotes).toBe(upvotes + 1);
  });

  test("should add comment", async () => {
    const { result } = renderHook(() => useFeedbackStore());
    const store = result.current;

    const feedback = store.feedbacks[0];
    const commentCount = feedback?.comments?.length || 0;
    const newComment: IAddComment = {
      user: {
        image: "./assets/user-images/image-victoria.jpg",
        name: "Victoria Mejia",
        username: "arlen_the_marlin",
      },
      content: "New comment",
    };

    //action
    let isSuccess = false;
    act(() => (isSuccess = store.addComment(feedback.id, newComment)));

    //test
    expect(isSuccess).toBe(true);
    expect(result.current.feedbacks[0].comments?.length).toBe(commentCount + 1);
  });

  test("should get feedback by id", async () => {
    const { result } = renderHook(() => useFeedbackStore());
    const store = result.current;

    const feedback = store.getById(1);

    expect(feedback).not.toBeNull
  });
});
