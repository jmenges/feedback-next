import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type Props = {};

const sortOptions = [];

export default function FeedbackSorter({}: Props) {
  return (
    <Select defaultValue="light">
      <SelectTrigger className="inline-flex max-w-[180px] border-none bg-transparent text-xs text-white shadow-none focus:ring-0 tablet:text-h4">
        Sort by:
        <SelectValue />
      </SelectTrigger>
      <SelectContent sideOffset={14}>
        <SelectItem value="light">Most Upvotes</SelectItem>
        <SelectItem value="dark">Least Upvotes</SelectItem>
        <SelectItem value="system">Most Comments</SelectItem>
        <SelectItem value="least-comments">Least Comments</SelectItem>
      </SelectContent>
    </Select>
  );
}
