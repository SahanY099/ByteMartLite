import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosClient } from "@/lib/axios-client";
import { ProductManagementData } from "@/types/products";

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
