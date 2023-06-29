import Card from "@/components/Card";
import Tag from "@/components/ui/Tag";
import React from "react";

type TagFilterProps = {};

const tags = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

export default function TagFilter({}: TagFilterProps) {
  return (
    <Card className="flex flex-wrap gap-y-2 gap-x-2">
      {tags.map((tag) => (
        <Tag key={tag} title={tag} type="button" />
      ))}
    </Card>
  );
}
