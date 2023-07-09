import { Categories } from "@/types/categories";

export const categories: Categories = [
  { name: "all", label: "All" },
  { name: "ui", label: "UI" },
  { name: "ux", label: "UX" },
  { name: "enhancement", label: "Enhancement" },
  { name: "bug", label: "Bug" },
  { name: "feature", label: "Feature" },
] as const;
