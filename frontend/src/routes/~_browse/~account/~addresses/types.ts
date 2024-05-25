import { AddressData } from "./schemas";

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
