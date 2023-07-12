import Card from "@/components/Card";
import { CommentPopulated } from "@/types/comments";
import CommentItem from "./CommentItem";

type CommentsProps = {
  comments?: CommentPopulated[];
  count: number;
  feedbackId: string;
};

export default function CommentList({
  comments,
  count,
  feedbackId,
}: CommentsProps) {
  if (comments === undefined) return;

  return (
    <Card>
      <h2 className="">{count} Comments</h2>
      <div className="flex flex-col divide-y divide-grey">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            feedbackId={feedbackId}
          />
        ))}
      </div>
    </Card>
  );
}
