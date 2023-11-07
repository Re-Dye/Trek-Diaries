import { z } from "zod";
import { CONSTANTS } from "@/lib/constants";
export const addPostFormSchema = z.object({
    description: z.string().min(1, "Description is required"),
    // trail_condition: z.number().min(0, "Enter a valid number").max(5, "Enter a valid number"),
    trail_condition: z.string().superRefine((val, ctx) => {
      const value: number = +val;
      if (Number.isNaN(value) || (value < 1 || value > 5)) {
        ctx.addIssue({code: z.ZodIssueCode.custom, message: "Enter a valid number" })
      } 
    }),
    weather: z.string().superRefine((val, ctx) => {
      const value: number = +val;
      if (Number.isNaN(value) || (value < 1 || value > 5)) {
        ctx.addIssue({code: z.ZodIssueCode.custom, message: "Enter a valid number" })
      } 
    }),
    accessibility: z.string().superRefine((val, ctx) => {
      const value: number = +val;
      if (Number.isNaN(value) || (value < 1 || value > 5)) {
        ctx.addIssue({code: z.ZodIssueCode.custom, message: "Enter a valid number" })
      } 
    }),
    image: z.custom<File>((v) => v instanceof File, {
      message: "File is required",
    }).refine((file) => file.size <= CONSTANTS.MAX_IMAGE_SIZE, `Max image size is 5MB.`).refine(
      (file) => CONSTANTS.ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type AddPostFormData = z.infer<typeof addPostFormSchema>;

export const addPostRequestSchema = z.object({
  description: z.string().min(1, "Description is required"),
  trail_condition: z.number().min(0, "Enter a valid number").max(5, "Enter a valid number"),
  weather: z.number().min(0, "Enter a valid number").max(5, "Enter a valid number"),
  accessibility: z.number().min(0, "Enter a valid number").max(5, "Enter a valid number"),
  image_url: z.string().url().min(1, "Image is required"),
  location_id: z.string().uuid().min(1, "Location is required"),
  owner_id: z.string().uuid().min(1, "Owner is required"),
});

export type AddPostRequestData = z.infer<typeof addPostRequestSchema>;