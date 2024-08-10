import { z } from "zod";

export const informationSchema = z.object({
  shippingAddressId: z.string({
    required_error: "Please select a shipping address",
  }),
  billingAddressId: z.string({
    required_error: "Please select a billing address",
  }),
});

export type InformationData = z.infer<typeof informationSchema>;
