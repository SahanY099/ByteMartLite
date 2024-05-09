import { useMutation } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { ResetPasswordData } from "@/types/auth";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await axiosClient.post("auth/reset-password", data);
      return response.data;
    },
  });
};
