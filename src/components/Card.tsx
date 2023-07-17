import { cn } from "@/lib/utils";
import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-white p-6 tablet:px-8 tablet:py-7",
        className
      )}
    >
      {children}
    </div>
  );
}
