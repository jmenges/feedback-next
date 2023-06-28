import { Button } from "@/components/ui/button";

import UpIcon from "@/../public/icons/icon-arrow-up.svg";
import { cn } from "@/lib/utils";

export interface UpvoteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  upvoteCount: number;
}

export default function UpvoteButton({
  onClick,
  className,
  upvoteCount = 10,
}: UpvoteButtonProps) {
  return (
    <Button
      variant="interactive"
      className={cn(
        className,
        "flex h-auto items-center font-bold text-darker-blue gap-[10px] py-1 tablet:flex-col tablet:gap-[6px] tablet:py-3.5"
      )}
    >
      <i className="[&>svg>path]:stroke-current">
        <UpIcon />
      </i>
      <span>{upvoteCount}</span>
    </Button>
  );
}
