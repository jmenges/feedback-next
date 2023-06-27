"use client";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Button } from "./button";

import BackIcon from "@/../public/icons/icon-arrow-left.svg";

const buttonVariants = cva("underline-offset-1", {
  variants: {
    variant: {
      default:
        "px-4 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 ",
      link: "text-blueGrey",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export default function BackButton({ variant, className }: BackButtonProps) {
  return (
    <Button
      variant="link"
      className={cn(buttonVariants({ variant, className }))}
    >
      <i className="[&>svg>path]:stroke-current mr-4">
        <BackIcon />
      </i>
      Back
    </Button>
  );
}
