import { categories } from "@/data/categories";

export type Categories = readonly Category[];
export type Category = { readonly label: string; readonly value: string };
export type CategoryValue = typeof categories[number]["value"];
