import { useMutation } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { OtpVerifyData } from "@/types/auth";

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (data: OtpVerifyData) => {
      return await axiosClient.post("auth/verify-otp", data);
    },
  });
};
