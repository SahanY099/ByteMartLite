import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosClient } from "@/lib/axios-client";
import { NameData } from "./schemas";
import { GeneralData } from "./types";

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
      const formData = new FormData();
      formData.append("image", image);

      return await axiosClient.post("account/update-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      toast.success("Profile image updated successfully.");
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
