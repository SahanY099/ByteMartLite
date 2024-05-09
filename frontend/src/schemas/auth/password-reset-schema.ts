import { z } from "zod";

import { OtpVerifySchema } from "./otp-verify-schema";

export const PasswordResetSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Password should contain at least 8 characters",
      })
      .max(128, { message: "Password is too long" }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password should contain at least 8 characters",
      })
      .max(128, { message: "Password is too long" }),
  })
  .merge(OtpVerifySchema)
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });
