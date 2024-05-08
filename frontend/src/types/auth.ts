import { z } from "zod";

import { LoginSchema, SignupSchema } from "@/schemas/auth";

export type SignupData = z.infer<typeof SignupSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
