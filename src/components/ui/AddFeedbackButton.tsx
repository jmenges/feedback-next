import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export interface AddFeedbackButtonProps {
  className?: string;
  disabled?: boolean;
  disabledMessage?: string;
}

export default function AddFeedbackButton({
  className,
  disabled = false,
  disabledMessage = "",
}: AddFeedbackButtonProps) {

  return (
    <>
      {disabled === false ? (
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
      ) : (
        <Button
          className={cn(className, "flex-shrink-0 !pointer-events-auto")}
          type="button"
          variant="default"
          title={disabledMessage}
          disabled
        >
          + Add Feedback
        </Button>
      )}
    </>
  );
}
