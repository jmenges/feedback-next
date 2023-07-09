"use client";

import Card from "@/components/Card";
import Category from "@/components/ui/Category";
import { ValidCategory, categories } from "@/data/categories";
import { ICategory } from "@/types/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

/**
 * The CategoryFilter works based on query parameters.
 * The local state will be initialized based on the URL.
 * Afterwards the URL will be updated based on the local state.
 */
export default function CategoryFilter() {
  /* State */
  const [activeCategory, setActiveCategory] = useState<ValidCategory | null>(
    null
  );

  /**
   * Hooks
   */
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  /* Calculatations */
  const queryParamCategory = useMemo(
    () => searchParams.get("category"),
    [searchParams]
  );

  /* Set the active category based on the query parameter on initial render */
  useEffect(() => {
    if (queryParamCategory !== null) {
      const validCategory = categories.find(
        (c) => c.name === queryParamCategory.toLowerCase()
      );
      //clear category from query params if invalid
      if (!validCategory) {
        setCategoryQueryString();
        return;
      }

      setActiveCategory(validCategory.name);
    } else {
      setActiveCategory("all");
    }
  }, []);

  /* Set query parameter based on active category */
  useEffect(() => {
    /* Guard clauses */
    if (
      activeCategory === null ||
      (!queryParamCategory && activeCategory === "all") ||
      queryParamCategory === activeCategory
    )
      return;

    /* Set query parameter based on active category */
    const nextCategory = activeCategory === "all" ? "" : activeCategory;
    setCategoryQueryString(nextCategory);
  }, [activeCategory, pathname, queryParamCategory]);

  /**
   * Functions
   */
  const setCategoryQueryString = useCallback(
    (value?: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      if (value) {
        params.set("category", value);
      } else {
        params.delete("category");
      }
      router.push(pathname + "?" + params.toString());
    },
    [searchParams, pathname]
  );

  /**
   * JSX
   */
  return (
    <Card className="flex flex-wrap gap-x-2 gap-y-2">
      {categories.map((category, index) => (
        <Category
          key={index}
          title={category.label}
          type="button"
          active={category.name === activeCategory}
          onClick={() => setActiveCategory(category.name)}
        />
      ))}
    </Card>
  );
}
