import { queryOptions, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosClient } from "@/lib/axios-client";
import { ProductUpdateData } from "../schemas";
import { Product } from "../types";

export const productQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["dashboard", "products", id],
    queryFn: async () => {
      const { data } = await axiosClient.get(`seller/products/${id}`);
      return data.data as Product;
    },
  });

export const useUpdateProduct = (id: number) => {
  return useMutation({
    mutationFn: async (data: ProductUpdateData) => {
      return await axiosClient.post(`seller/products/${id}`, data);
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later");
    },
  });
};
