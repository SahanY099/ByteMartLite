import { queryOptions } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { ProductData, ProductListItem } from "./types";

export const productDetailsOption = (id: string) =>
  queryOptions({
    queryKey: ["products", "item", id],
    queryFn: async () => {
      const { data } = await axiosClient.get(`products/${id}`);
      return data.data as ProductData;
    },
  });

export const similarProductsQueryOption = (id: string) =>
  queryOptions({
    queryKey: ["browse", "item", id, "similar"],
    queryFn: async () => {
      const { data } = await axiosClient.get("products", {
        params: { view: "single_image" },
      });
      return data.data as ProductListItem[];
    },
  });
