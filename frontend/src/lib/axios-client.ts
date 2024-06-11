import axios from "axios";

import { useAuthStore } from "@/store/auth";

const baseURL =
  import.meta.env.VITE_NGROK_API_URL ??
  `http://${window.location.hostname}:${import.meta.env.VITE_API_PORT}`;

const axiosClient = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "ngrok-skip-browser-warning": "69420",
  },
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
