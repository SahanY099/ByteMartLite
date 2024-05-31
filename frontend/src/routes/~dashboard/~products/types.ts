import { ProductUpdateData } from "./schemas";

export type ProductListItem = {
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

export type Product = {
  id: number;
  category: Category;
  images: {
    url: string;
  }[];
} & Omit<ProductUpdateData, "categoryId">;
