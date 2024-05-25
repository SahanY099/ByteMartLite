import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosClient } from "@/lib/axios-client";
import {
  OtpVerifyData,
  PasswordResetData,
} from "@/routes/~_auth/~reset-password/schemas";

export const useResendOtp = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      return await axiosClient.post("auth/resend-otp", { email });
    },
    onSuccess: () => {
      toast.success("OTP sent to email");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later");
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: PasswordResetData) => {
      const response = await axiosClient.post("auth/reset-password", data);
      return response.data;
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (data: OtpVerifyData) => {
      return await axiosClient.post("auth/verify-otp", data);
    },
  });
};
