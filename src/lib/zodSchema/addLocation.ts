import * as z from "zod";
import { CONSTANTS } from "../constants";

export const addLocationFormSchema = z
.object({
    address: z.string().min(1, { message: "Address is required" }),
    state: z.string().min(1, { message: "State is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    desc: z.string().min(1, { message: "Description is required" }),
})

export type addLocationFormData = z.infer<typeof addLocationFormSchema>;