import { categories } from "@/data/categories";
import { z } from "zod";

/* extract category values from categories */
const categoryValues = categories.map(({value}) => value) as [string,...string[]];

export const postFeedbackSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(categoryValues),
});