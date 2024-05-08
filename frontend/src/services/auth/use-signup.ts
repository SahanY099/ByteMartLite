import { useMutation } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { UserData, useAuthStore } from "@/store/auth";
import { SignupData } from "@/types/auth";

export const useSignup = () => {
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await axiosClient.post("auth/signup", data);
      return response.data.data as UserData;
    },
    onSuccess: (data) => {
      setUser(data);
    },
  });
};
