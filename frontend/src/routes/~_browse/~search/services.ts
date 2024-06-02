import { queryOptions } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { PaginatedResponse } from "@/types/response-types";
import { ProductListItem } from "../types";
import { ProductSearchData } from "./schemas";

export const productSearchOptions = (queryData: ProductSearchData) =>
  queryOptions({
    queryKey: ["products", "search", queryData],
    queryFn: async () => {
      const { data } = await axiosClient.get("products/search", {
        params: queryData,
      });
      return data as PaginatedResponse<ProductListItem>;
    },
  });
