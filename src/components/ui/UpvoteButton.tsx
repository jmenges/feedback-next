"use client";

import { Button } from "@/components/ui/button";

import UpIcon from "@/../public/icons/icon-arrow-up.svg";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export interface UpvoteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  upvoteCount: number;
  isUpvoted: boolean;
  feedbackId: string;
  size?: "default" | "small";
}

export default function UpvoteButton({
  upvoteCount = 0,
  isUpvoted = false,
  feedbackId,
  className,
  size = "default",
  ...props
}: UpvoteButtonProps) {
  /* Router */
  const router = useRouter();

  let sizeClass =
    size === "default" ? "tablet:flex-col tablet:gap-[6px] tablet:py-3.5" : "";


  /* Function for handleing upvote or remove upvote */
  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    let fetchOptions;
    if (isUpvoted) {
      fetchOptions = {
        method: "DELETE",
      };
    } else {
      fetchOptions = {
        method: "POST",
      };
    }

    const res = await fetch(
      `/api/feedback/${feedbackId}/upvotes`,
      fetchOptions
    );

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

  /* JSX */
  return (
    <Button
      onClick={onClick}
      variant="interactive"
      className={cn(
        "flex h-auto items-center gap-[10px] py-1 font-bold text-darker-blue tablet:pb-[6px] tablet:pl-4 tablet:pr-[16.5px] tablet:pt-[7px] desktop:pb-[10px] desktop:pt-[11px]",
        !!isUpvoted && "bg-blue text-white",
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
