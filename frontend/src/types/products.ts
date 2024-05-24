import { z } from "zod";

import { ManagementSchema } from "@/schemas/products";

export type ProductManagementData = z.infer<typeof ManagementSchema>;

export type Product = {
  id: number;
  name: string;
  price: string;
  createdAt: string;
  image: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
};
