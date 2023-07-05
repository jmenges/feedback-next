import Card from "@/components/Card";
import Category from "@/components/ui/Category";
import { categories } from "@/data/categories";
import { ICategory } from "@/types";
import React from "react";

type CategoryFilterProps = {
  activeCategory: ICategory;
  setActiveCategory: React.Dispatch<ICategory>;
};

export default function CategoryFilter({
  activeCategory,
  setActiveCategory,
}: CategoryFilterProps) {
  return (
    <Card className="flex flex-wrap gap-x-2 gap-y-2">
      {categories.map((category, index) => (
        <Category
          key={index}
          title={category}
          type="button"
          active={category === activeCategory}
          onClick={() => setActiveCategory(category)}
        />
      ))}
    </Card>
  );
}
