import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { categoriesQueryOptions } from "@/services/categories";
import { PaginatedResponse } from "@/types/response-types";
import { ProductListItem } from "./types";

export const productsQueryOptions = (page: number) =>
  queryOptions({
    queryKey: ["dashboard", "products", `page=${page}`],
    queryFn: async () => {
      const { data } = await axiosClient.get(`seller/products?page=${page}`);
      return data as PaginatedResponse<ProductListItem>;
    },
    placeholderData: keepPreviousData,
  });

export const useCategories = () => useQuery(categoriesQueryOptions);
