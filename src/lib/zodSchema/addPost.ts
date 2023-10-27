import { z } from "zod";
import { CONSTANTS } from "@/lib/constants";
export const addPostFormSchema = z.object({
    description: z.string().min(1, "Description is required"),
    trail_condition: z.number().min(0, "Enter a valid number").max(5, "Enter a valid number"),
    weather: z.number().min(0, "Enter a valid number").max(5, "Enter a valid number"),
    accessibility: z.number().min(0, "Enter a valid number").max(5, "Enter a valid number"),
    image: z.any()
    .refine((file) => file?.size <= CONSTANTS.MAX_IMAGE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => CONSTANTS.ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
});

export type AddPostFormData = z.infer<typeof addPostFormSchema>;