import { queryOptions } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { ProductListItem } from "./types";

export const productsQueryOptions = queryOptions({
  queryKey: ["browse", "new-arrivals"],
  queryFn: async () => {
    const { data } = await axiosClient.get("products");
    return data.data as ProductListItem[];
  },
});
