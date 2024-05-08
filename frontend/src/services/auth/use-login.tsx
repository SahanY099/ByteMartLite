import { useMutation } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { UserData, useAuthStore } from "@/store/auth";
import { LoginData } from "@/types/auth";

export const useLogin = () => {
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await axiosClient.post("auth/login", data);
      return response.data.data as UserData;
    },
    onSuccess: (data) => {
      setUser(data);
    },
  });
};
