import { z } from "zod";

import { SignupSchema } from "@/schemas/auth";

export type SignupData = z.infer<typeof SignupSchema>;
