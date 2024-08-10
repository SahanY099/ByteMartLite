import { useMutation } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { InformationData } from "./schemas";

export const useCheckout = () => {
  return useMutation({
    mutationFn: async (data: InformationData) => {
      const { data: res } = await axiosClient.post("checkout", data);

      return res as {
        clientSecret: string;
      };
    },
  });
};
