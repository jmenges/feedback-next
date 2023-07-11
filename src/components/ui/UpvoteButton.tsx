"use client";

import { Button } from "@/components/ui/button";

import UpIcon from "@/../public/icons/icon-arrow-up.svg";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export interface UpvoteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  upvoteCount: number;
  feedbackId: number;
  size?: "default" | "small";
}

export default function UpvoteButton({
  upvoteCount = 0,
  feedbackId,
  className,
  size = "default",
  ...props
}: UpvoteButtonProps) {
  /* Router */
  const router = useRouter();

  let sizeClass =
    size === "default" ? "tablet:flex-col tablet:gap-[6px] tablet:py-3.5" : "";

  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const res = await fetch(`/api/feedback/${feedbackId}/upvotes  `, {
      method: "POST",
    });

    if (res.status !== 200) {
      try {
        const error = await res.json();
        console.error(error);
      } catch (e) {
        console.error(e);
      }
      return;
    }

    router.refresh();
  };

  return (
    <Button
      onClick={onClick}
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
