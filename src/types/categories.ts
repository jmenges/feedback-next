import { categories } from "@/data/categories";

export type Categories = readonly Category[];
export type Category = { readonly name: string; readonly label: string };
export type ValidCategory = (typeof categories)[number]["name"];
