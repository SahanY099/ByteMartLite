import { z } from "zod";

export const addressSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is too short" })
    .max(255, { message: "Name is too long" }),
  street: z
    .string()
    .min(1, { message: "Address is too short" })
    .max(255, { message: "Address is too long" }),
  unit: z.string().optional(),
  city: z.number(),
  postalCode: z
    .string()
    .min(1, { message: "Postal code is too short" })
    .max(255, { message: "Postal code is too long" }),
  isBilling: z.boolean(),
});

export type AddressData = z.infer<typeof addressSchema>;
