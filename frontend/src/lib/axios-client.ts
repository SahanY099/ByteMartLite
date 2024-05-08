import axios from "axios";

import { useAuthStore } from "@/store/auth";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
});

axiosClient.interceptors.request.use((config) => {
  const { user } = useAuthStore.getState();
  if (user) {
    const token = user.token.key;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { axiosClient };
