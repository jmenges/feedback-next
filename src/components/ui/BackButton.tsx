import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

import BackIcon from "@/../public/icons/icon-arrow-left.svg";
import IconLink from "@/components/ui/IconLink";

const buttonVariants = cva("underline-offset-1", {
  variants: {
    variant: {
      default: "px-4 py-1 bg-darker-blue text-white hover:bg-darker-blue/90",
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
  href: string;
}

export default function BackButton({
  variant,
  href,
  className,
}: BackButtonProps) {
  return (
    <IconLink
      Icon={BackIcon}
      variant="link"
      size="raw"
      className={cn(
        buttonVariants({ variant, className }),
        "px-0 text-xs tablet:text-h4 h-9"
      )}
      href={href}
    >
      Back
    </IconLink>
  );
}
