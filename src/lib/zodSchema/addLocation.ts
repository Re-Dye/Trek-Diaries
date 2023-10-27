import { z } from "zod";
import { CONSTANTS } from "../constants";

export const AddLocationFormSchema = z.object({
  place: z.string().min(1, { message: "Place is required" }),
  state: z.string().min(1, { message: "State is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  description: z.string().min(1, { message: "Description is required" }),
}).refine(
  (val) => {
    const words = val.description.split(" ");
    return (words.length >= CONSTANTS.MIN_DESCRIPTION_WORDS && words.length <= CONSTANTS.MAX_DESCRIPTION_WORDS);
  },
  {
    message: `Description must be at least ${ CONSTANTS.MIN_DESCRIPTION_WORDS } words and at most ${ CONSTANTS.MAX_DESCRIPTION_WORDS } words.`,
    path: ["description"],
  }
);

export type AddLocationFormData = z.infer<typeof AddLocationFormSchema>;