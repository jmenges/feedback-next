import Card from "@/components/Card";
import { IComments, IReply } from "@/types";
import CommentItem from "./CommentItem";

type CommentsProps = {
  comments?: IComments;
  feedbackId: number;
  addReply: ({
    feedbackId,
    commentId,
    reply,
  }: {
    feedbackId: number;
    commentId: number;
    reply: IReply;
  }) => boolean;
};

export default function CommentList({
  comments,
  feedbackId,
  addReply,
}: CommentsProps) {
  if (comments === undefined) return;

  const replyCount = comments.reduce((acc, curr) => {
    return acc + (curr.replies?.length || 0);
  }, 0);
  const commentCount = comments.length + replyCount;

  return (
    <Card>
      <h2 className="">{commentCount} Comments</h2>
      <div className="flex flex-col divide-y divide-grey">
        {comments.map((comment) => (
          <CommentItem
            feedbackId={feedbackId}
            addReply={addReply}
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
    </Card>
  );
}
