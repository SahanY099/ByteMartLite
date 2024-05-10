import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getPersistStorageHandler } from "../handler";

export type UserData = {
  id: number | undefined;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  image: string | undefined;
  token: {
    key: string | undefined;
    expiresAt: Date | undefined;
  };
};

const anonymousUser = {
  id: undefined,
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  image: undefined,
  token: {
    key: undefined,
    expiresAt: undefined,
  },
};

export type AuthState = {
  user: UserData;
  isAuthenticated: () => boolean;
  setUser: (userData: UserData) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: anonymousUser,
      isAuthenticated: () => {
        const state = get();
        const { expiresAt } = state.user.token;

        if (!expiresAt || new Date() > expiresAt) {
          set(() => ({
            user: anonymousUser,
          }));
          return false;
        }

        return true;
      },
      setUser: (userData) => {
        const expiresAtDate = userData.token.expiresAt
          ? new Date(userData.token.expiresAt)
          : undefined;

        set(() => ({
          user: {
            ...userData,
            token: { ...userData.token, expiresAt: expiresAtDate },
            isAuthenticated: true,
          },
        }));
      },
      clearUser: () => {
        set(() => ({
          user: anonymousUser,
        }));
      },
    }),
    {
      name: "auth-storage",
      storage: getPersistStorageHandler<AuthState>(),
    },
  ),
);
