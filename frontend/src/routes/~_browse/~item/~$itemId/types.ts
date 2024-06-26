import { Category } from "@/types/categories";

export type ProductData = {
  id: number;
  name: string;
  description: string;
  category: Category;
  price: number;
  images: string[];
};

export type ProductListItem = {
  id: number;
  name: string;
  price: string;
  image: string;
};
