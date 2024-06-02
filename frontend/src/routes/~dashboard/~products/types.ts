import { Category } from "@/types/categories";
import { ProductUpdateData } from "./schemas";

export type ProductListItem = {
  id: number;
  name: string;
  price: string;
  createdAt: string;
  image: string;
};

export type Product = {
  id: number;
  category: Category;
  images: {
    url: string;
  }[];
} & Omit<ProductUpdateData, "categoryId">;
