import { cn } from "@/lib/utils";

import IconPlus from "@/../public/icons/icon-plus.svg";
import { IconButtonProps } from "@/components/ui/IconButton";
import IconLink from "@/components/ui/IconLink";

export interface AddFeedbackButtonProps extends IconButtonProps {
  asChild: boolean;
}

export default function AddFeedbackButton({
  className,
}: AddFeedbackButtonProps) {
  return (
    <IconLink
      Icon={IconPlus}
      variant="default"
      className={cn(className, "flex-shrink-0")}
      href="/feedback/new"
    >
      Add Feedback
    </IconLink>
  );
}
