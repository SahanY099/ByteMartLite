import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosClient } from "@/lib/axios-client";
import { Address, City, Province } from "./types";

export const addressesQueryOptions = queryOptions({
  queryKey: ["account-data", "addresses"],
  queryFn: async () => {
    const { data } = await axiosClient.get("account/addresses");
    return data.data as Address[];
  },
});

export const useGetProvinces = () => {
  return useQuery({
    queryKey: ["account-data", "accounts", "provinces"],
    queryFn: async () => {
      const { data } = await axiosClient.get(
        "account/addresses/administrative-areas/",
      );
      return data.data as Province[];
    },
  });
};

export const useGetCities = (provinceId: number | null) => {
  return useQuery({
    queryKey: ["account-data", "accounts", "cities", provinceId],
    queryFn: async () => {
      const { data } = await axiosClient.get(
        `account/addresses/administrative-areas/${provinceId}`,
      );
      return data.data as City[];
    },
    enabled: !!provinceId,
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
