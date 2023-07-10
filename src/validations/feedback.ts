import { categories } from "@/data/categories";
import { status } from "@/data/status";
import { z } from "zod";

/* extract category values from categories */
const categoryValues = categories.map(({ value }) => value) as [
  string,
  ...string[]
];

export const postFeedbackSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(categoryValues),
});

/* extract category values from categories */
const statusValues = status.map(({ value }) => value) as [string, ...string[]];

export const patchFeedbackSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.enum(categoryValues),
  status: z.enum(statusValues),
});
