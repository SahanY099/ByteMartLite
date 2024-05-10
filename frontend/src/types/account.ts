import { z } from "zod";

import { NameSchema } from "@/schemas/account";

export type GeneralData = {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

export type NameData = z.infer<typeof NameSchema>;
