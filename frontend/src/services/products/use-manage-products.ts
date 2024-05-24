import {
  keepPreviousData,
  queryOptions,
  useMutation,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosClient } from "@/lib/axios-client";
import { Product, ProductManagementData } from "@/types/products";
import { PaginatedResponse } from "@/types/response-types";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (data: ProductManagementData) => {
      const formData = new FormData();

      // Append images to the formData object
      Array.from(data.images).forEach((file) => {
        formData.append("images[]", file);
      });

      // Append other product data to the formData
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("quantity", data.quantity.toString());
      formData.append("categoryId", data.categoryId.toString());

      const response = await axiosClient.post("seller/products", formData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Product created successfully.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later");
    },
  });
};

export const productsQueryOptions = (page: number) =>
  queryOptions({
    queryKey: ["dashboard", "products", `page=${page}`],
    queryFn: async () => {
      const { data } = await axiosClient.get(`seller/products?page=${page}`);
      return data as PaginatedResponse<Product>;
    },
    placeholderData: keepPreviousData,
  });
