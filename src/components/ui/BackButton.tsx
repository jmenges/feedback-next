import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Button } from "./button";

import BackIcon from "@/../public/icons/icon-arrow-left.svg";
import IconButton from "@/components/ui/IconButton";

const buttonVariants = cva("underline-offset-1", {
  variants: {
    variant: {
      default: "px-4 bg-darker-blue text-white hover:bg-darker-blue/90",
      link: "text-blue-grey",
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
    <IconButton
      Icon={BackIcon}
      variant="link"
      className={cn(buttonVariants({ variant, className }))}
    >
      Back
    </IconButton>
  );
}
