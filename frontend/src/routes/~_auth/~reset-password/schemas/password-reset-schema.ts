import { z } from "zod";

export const passwordResetSchema = z
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
    code: z.string().length(6, "OTP must be 6 digits").regex(/^\d+$/),
    email: z.string().email(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

export type PasswordResetData = z.infer<typeof passwordResetSchema>;
