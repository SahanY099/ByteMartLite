import { queryOptions, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosClient } from "@/lib/axios-client";
import { Address, AddressData } from "@/types/account";

export const addressesQueryOptions = queryOptions({
  queryKey: ["account-data", "addresses"],
  queryFn: async () => {
    const { data } = await axiosClient.get("account/addresses");
    return data.data as Address[];
  },
});

export const addressQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["account-data", "addresses", id],
    queryFn: async () => {
      const { data } = await axiosClient.get(`account/addresses/${id}`);
      return data.data as Address;
    },
  });

export const useCreateAddress = () => {
  return useMutation({
    mutationFn: async (data: AddressData) => {
      return await axiosClient.post("account/addresses", data);
    },
    onSuccess: () => {
      toast.success("Address added successfully.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later");
    },
  });
};

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

export const useDeleteAddress = (id: number) => {
  return useMutation({
    mutationFn: async () => {
      return await axiosClient.delete(`account/addresses/${id}`);
    },
    onSuccess: () => {
      toast.success("Address deleted successfully.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later");
    },
  });
};

export const useMakeDefaultAddress = (id: number) => {
  return useMutation({
    mutationFn: async () => {
      return await axiosClient.delete(`account/addresses/${id}/make-default`);
    },
    onSuccess: () => {
      toast.success("Default address updated successfully.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later");
    },
  });
};
