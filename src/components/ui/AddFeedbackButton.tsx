import { cn } from "@/lib/utils";

import IconPlus from "@/../public/icons/icon-plus.svg";
import IconButton from "@/components/ui/IconButton";

export interface AddFeedbackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export default function AddFeedbackButton({
  className,
}: AddFeedbackButtonProps) {
  return (
    <IconButton
      Icon={IconPlus}
      variant="default"
      className={cn(className, "flex-shrink-0")}
    >
      Add Feedback
    </IconButton>
  );
}
