import { z } from "zod";

export const otpVerifySchema = z.object({
  code: z.string().length(6, "OTP must be 6 digits").regex(/^\d+$/),
  email: z.string().email(),
});

export type OtpVerifyData = z.infer<typeof otpVerifySchema>;
