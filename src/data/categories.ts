export const categories = [
  "All",
  "UI",
  "UX",
  "Enhancement",
  "Bug",
  "Feature",
] as const;
export type ICategory = (typeof categories)[number];