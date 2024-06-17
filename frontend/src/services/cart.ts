import { useMutation, useQuery } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { queryClient } from "@/lib/query-client";
import { Cart, CartItemData } from "@/types/cart";

export const useCart = () =>
  useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await axiosClient.get("cart");
      return data.data as Cart;
    },
  });

export const useAddToCart = () =>
  useMutation({
    mutationFn: async (data: CartItemData) => {
      return await axiosClient.post("cart/cart-items", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

export const useRemoveFromCart = () =>
  useMutation({
    mutationFn: async ({
      productId,
      quantity = 1,
      completely = false,
    }: {
      productId: number;
      quantity?: number;
      completely?: boolean;
    }) => {
      return await axiosClient.delete(`cart/cart-items/${productId}`, {
        params: {
          complete: completely ? 1 : 0,
          quantity: quantity,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
