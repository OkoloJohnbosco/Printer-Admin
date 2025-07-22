import { z } from "zod";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; //5MB

export const fileSchema = (maxSize: number, allowedTypes: string[]) =>
  z
    .custom<File>((file) => file instanceof File, {
      message: "Please upload a file.",
    })
    .refine((file) => file?.size <= maxSize, {
      message: `File size should be less than ${maxSize / (1024 * 1024)}MB.`,
    })
    .refine((file) => allowedTypes.includes(file?.type), {
      message: `Only ${allowedTypes.join(", ")} files are accepted.`,
    });

export const BusinessInfoVerificationFormSchema = z.object({
  business_email: z.email("Must be a valid email"),
  business_name: z
    .string({ error: "Business name is required" })
    .min(1, "Business name is required"),
  business_type: z.string({ error: "Business type is required" }),
  business_address: z
    .string({ error: "Business address is required" })
    .min(1, "Business address is required"),
  business_phone: z
    .string()
    .regex(
      /^(?:\+234|0)[789][01]\d{8}$/,
      "Invalid Nigerian phone number. Use +234XXXXXXXXXX or 0XXXXXXXXXX format."
    ),
  business_logo: fileSchema(MAX_FILE_SIZE, ["image/jpeg", "image/png"]),
  business_license: fileSchema(MAX_FILE_SIZE, ["image/jpeg", "image/png"]),
  tax_registration: fileSchema(MAX_FILE_SIZE, ["image/jpeg", "image/png"]),
  equipment_inventory: fileSchema(MAX_FILE_SIZE, ["image/jpeg", "image/png"]),
});
