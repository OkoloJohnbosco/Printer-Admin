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

export const AddNewWorkFormSchema = z.object({
  project_title: z
    .string({ error: "Project title is required" })
    .min(1, "Project title is required"),
  category: z.string({ error: "Category is required" }),
  specification: z
    .string({ error: "Specification is required" })
    .min(1, "Specification is required"),
  description: z
    .string({ error: "Description is required" })
    .min(1, "Specification is required"),

  business_logo: fileSchema(MAX_FILE_SIZE, ["image/jpeg", "image/png"]),
  visibility: z.enum(["public", "private", "save-as-draft"], {
    error: "You need to select a visibility type",
  }),
});
