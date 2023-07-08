import React from "react";

import IconComment from "@/../public/icons/icon-comments.svg";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  count: number;
};

export default function CommentCounter({ count, className }: Props) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 py-1 font-bold text-darker-blue",
        className
      )}
    >
      <IconComment className="" />
      <span
        className={count === 0 ? "opacity-50" : ""}
        data-cy="feedback-count"
      >
        {count}
      </span>
    </div>
  );
}
