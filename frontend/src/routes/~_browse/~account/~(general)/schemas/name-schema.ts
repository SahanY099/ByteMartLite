import { z } from "zod";

export const nameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is too short" })
    .max(50, { message: "First name is too long" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is too short" })
    .max(50, { message: "Last name is too long" }),
});

export type NameData = z.infer<typeof nameSchema>;
