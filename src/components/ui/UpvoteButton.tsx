import { Button } from "@/components/ui/button";

import UpIcon from "@/../public/icons/icon-arrow-up.svg";
import { cn } from "@/lib/utils";

export interface UpvoteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  upvoteCount: number;
  size?: "default" | "small";
}

export default function UpvoteButton({
  className,
  size = "default",
  upvoteCount = 0,
  ...props
}: UpvoteButtonProps) {
  let sizeClass =
    size === "default" ? "tablet:flex-col tablet:gap-[6px] tablet:py-3.5" : "";

  return (
    <Button
      variant="interactive"
      className={cn(
        "flex h-auto items-center gap-[10px] py-1 font-bold text-darker-blue tablet:pb-[6px] tablet:pl-4 tablet:pr-[16.5px] tablet:pt-[7px] desktop:pb-[10px] desktop:pt-[11px]",
        sizeClass,
        className
      )}
      {...props}
    >
      <i className="[&>svg>path]:stroke-current">
        <UpIcon />
      </i>
      <span>{upvoteCount}</span>
    </Button>
  );
}
