import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-purple text-white hover:bg-purple/90",
        secondary: "bg-darker-blue text-white hover:bg-darker-blue/90",
        destructive: "bg-red text-white hover:bg-red/80",
        accent: "bg-blue text-white hover:bg-blue/80",
        link: "text-blue-grey underline-offset-2 hover:underline",
        raw: "rounded-none ",
        interactive:
          "bg-light-grey hover:bg-[#CFD7FF] aria-active:bg-blue aria-active:text-white",
      },
      size: {
        default:
          "h-9 px-4 py-2 tablet:text-h4 tablet:pt-[12.5px] tablet:pb-[11.5px] tablet:px-6",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        raw: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
