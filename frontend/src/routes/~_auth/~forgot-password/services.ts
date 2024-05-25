import { useMutation } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { ForgotPasswordData } from "./schemas";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgotPasswordData) => {
      const response = await axiosClient.post("auth/forgot-password", data);
      return response.data;
    },
  });
};
