import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { axiosClient } from "@/lib/axios-client";

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
