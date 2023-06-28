import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

export default function ActionBar({}: Props) {
  return <div className="h-14 bg-darker-blue flex items-center"><Button variant="default">Add Feedback</Button></div>;
}
