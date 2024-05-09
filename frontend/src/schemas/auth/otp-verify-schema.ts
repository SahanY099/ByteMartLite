import { z } from "zod";

import { ForgotPasswordSchema } from "./forgot-password-schema";

export const OtpVerifySchema = z
  .object({
    code: z.string().length(6, "OTP must be 6 digits").regex(/^\d+$/),
  })
  .merge(ForgotPasswordSchema);
