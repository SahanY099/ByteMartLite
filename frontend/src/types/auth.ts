import { z } from "zod";

import {
  ForgotPasswordSchema,
  LoginSchema,
  OtpVerifySchema,
  PasswordResetSchema,
  SignupSchema,
} from "@/schemas/auth";

export type SignupData = z.infer<typeof SignupSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
export type OtpVerifyData = z.infer<typeof OtpVerifySchema>;
export type ResetPasswordData = z.infer<typeof PasswordResetSchema>;
export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;
