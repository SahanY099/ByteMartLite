import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosClient } from "@/lib/axios-client";
import { GeneralData, NameData } from "@/types/account";

export const useGetGeneralData = () => {
  return useQuery({
    queryKey: ["account-data", "general"],
    queryFn: async () => {
      const { data } = await axiosClient.get("account");

      return data.data as GeneralData;
    },
  });
};

export const useUpdateImage = () => {
  return useMutation({
    mutationFn: async (image: File) => {
      return await axiosClient.post(
        "account/update-image",
        { image },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    },
    onSuccess: () => {
      toast.success("Image updated successfully.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later");
    },
  });
};

export const useUpdateName = () => {
  return useMutation({
    mutationFn: async (data: NameData) => {
      return await axiosClient.post("account", data);
    },
    onSuccess: () => {
      toast.success("Name updated successfully.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later");
    },
  });
};
