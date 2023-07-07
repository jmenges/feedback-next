import { cn } from "@/lib/utils";

import { IconButtonProps } from "@/components/ui/IconButton";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export interface AddFeedbackButtonProps {
  className?: string;
}

export default function AddFeedbackButton({
  className,
}: AddFeedbackButtonProps) {
  return (
    <Link
      className={cn(
        className,
        buttonVariants({ variant: "default" }),
        "flex-shrink-0"
      )}
      href="/feedback/new"
    >
      + Add Feedback
    </Link>
  );
}
