import { OtpVerifyData } from "@/types/auth";
import { create } from "zustand";

export type PasswordResetState = {
  code: string;
  email: string;
  resetIsComplete: boolean;
  clearData: () => void;
  completeReset: () => void;
  setCode: (code: string) => void;
  setEmail: (email: string) => void;
} & OtpVerifyData;

export const usePasswordResetStore = create<PasswordResetState>()((set) => ({
  code: "",
  email: "",
  resetIsComplete: false,
  setCode: (code) => set((state) => ({ ...state, code })),
  setEmail: (email) => set((state) => ({ ...state, email })),
  clearData: () => set(() => ({ code: "", email: "", resetIsComplete: false })),
  completeReset: () =>
    set(() => ({ code: "", email: "", resetIsComplete: true })),
}));
