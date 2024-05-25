import { queryOptions, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosClient } from "@/lib/axios-client";
import { AddressData } from "../schemas";
import { Address } from "../types";

export const addressQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["account-data", "addresses", id],
    queryFn: async () => {
      const { data } = await axiosClient.get(`account/addresses/${id}`);
      return data.data as Address;
    },
  });

export const useUpdateAddress = (id: number) => {
  return useMutation({
    mutationFn: async (data: AddressData) => {
      return await axiosClient.post(`account/addresses/${id}`, data);
    },
    onSuccess: () => {
      toast.success("Address updated successfully.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later");
    },
  });
};
