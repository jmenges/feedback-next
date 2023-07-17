import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title: string;
  active?: boolean;
  onClick?: () => void;
  type: "info" | "button";
};

export default function Category({
  title,
  type,
  active = false,
  onClick,
}: Props) {
  if (type === "info")
    return (
      <div className="inline-flex rounded-md bg-light-grey px-4 py-1 text-xs font-semibold text-blue">
        {title}
      </div>
    );

  // type === "button"
  return (
    <Button
      className={cn("text-xs text-blue",active === true ? "bg-blue text-white hover:bg-blue" : "")}
      variant="interactive"
      onClick={onClick}
    >
      {title}
    </Button>
  );
}
