import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosClient } from "@/lib/axios-client";
import { AddressData } from "../schemas";

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
