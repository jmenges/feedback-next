import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  title: string;
  onClick?: () => void;
  type: "info" | "button";
};

export default function Tag({ title, type, onClick }: Props) {
  if (type === "info")
    return (
      <div className="inline-flex text-xs font-semibold rounded-md bg-light-grey px-4 py-1 text-blue">
        {title}
      </div>
    );

  // type === "button"
  return (
    <Button className="text-blue text-xs" variant="interactive" onClick={onClick}>
      {title}
    </Button>
  );
}
