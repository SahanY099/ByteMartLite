import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { Category } from "@/types/products";

export const useCategories = () => {
  return useQuery({
    queryKey: ["products", "categories"],
    queryFn: async () => {
      const { data } = await axiosClient.get("categories");
      return data.data as Category[];
    },
  });
};
