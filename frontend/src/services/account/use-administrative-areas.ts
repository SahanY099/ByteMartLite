import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { City, Province } from "@/types/account";

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
