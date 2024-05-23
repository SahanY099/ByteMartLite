import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 1; // 1MB
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const ManagementSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is too short" })
    .max(255, { message: "Name is too long" }),
  description: z
    .string()
    .min(1, { message: "Description is too short" })
    .max(255, { message: "Description is too long" }),
  price: z.coerce.number().positive(),
  quantity: z.coerce.number().positive(),
  categoryId: z.number(),
  images: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, `You must upload at least one image.`)
    .refine((files) => files.length <= 5, `You can only upload up to 5 files.`)
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
        ),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    )
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      `Max image size is 1MB.`,
    ),
});
