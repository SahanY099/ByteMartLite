import { create } from "zustand";

export enum Step {
  "Information" = 1,
  "Payment",
  "Completed",
  "Failed",
}

export type CheckoutState = {
  currentStep: Step;
  clientSecret: string | undefined;
  setCurrentStep: (step: Step) => void;
  setClientSecret: (clientSecret: string | undefined) => void;
  clearClientSecret: () => void;
};

export const useCheckoutStore = create<CheckoutState>()((set) => ({
  clientSecret: undefined,
  currentStep: Step.Information,
  setCurrentStep: (step) => set({ currentStep: step }),
  setClientSecret: (clientSecret) => set({ clientSecret }),
  clearClientSecret: () => set({ clientSecret: undefined }),
}));
