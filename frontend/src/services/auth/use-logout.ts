import { useMutation } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axios-client";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";

export const useLogout = () => {
  const { clearUser } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      await axiosClient.post("auth/logout");
    },
    onSuccess: () => {
      clearUser();
      toast.info("Logout successful");
    },
    onError: () => {
      clearUser();
      toast.warning("You are only logged out from the client.");
    },
  });
};
