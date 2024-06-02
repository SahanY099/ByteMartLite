import { queryOptions } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { Category } from "@/types/categories";

export const categoriesQueryOptions = queryOptions({
  queryKey: ["products", "categories"],
  queryFn: async () => {
    const { data } = await axiosClient.get("categories");
    return data.data as Category[];
  },
});
