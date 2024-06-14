import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
import { z } from "zod";

export const sortOptions = [
  { value: "name", label: "Name" },
  { value: "price", label: "Price" },
  { value: "created_at", label: "Date" },
] as const;

export const orderOptions = [
  { value: "asc", label: "Asc", icon: ArrowDownWideNarrow },
  { value: "desc", label: "Desc", icon: ArrowUpWideNarrow },
] as const;

export const productSearchSchema = z.object({
  q: z.string().optional().catch(""),
  category: z.string().optional(),
  sort: z.enum(["name", "price", "created_at"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.number().optional().catch(1),
});

export type ProductSearchData = z.infer<typeof productSearchSchema>;
