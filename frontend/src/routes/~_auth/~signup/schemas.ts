import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is too short" })
      .max(50, { message: "First name is too long" }),
    lastName: z
      .string()
      .min(1, { message: "Last name is too short" })
      .max(50, { message: "Last name is too long" }),
    email: z.string().email().max(255, { message: "Email is too long" }),
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
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

export type SignupData = z.infer<typeof signupSchema>;
