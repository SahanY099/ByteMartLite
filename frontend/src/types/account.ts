import { z } from "zod";

import { AddressSchema, NameSchema } from "@/schemas/account";

export type GeneralData = {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

export type NameData = z.infer<typeof NameSchema>;
export type AddressData = z.infer<typeof AddressSchema>;

export type Province = {
  id: number;
  name: string;
};

export type City = {
  id: number;
  name: string;
};

export type Address = {
  id: number;
  isDefault: boolean;
  city: City;
  province: Province;
} & Omit<AddressData, "city">;
