import * as z from "zod";
import { CONSTANTS } from "../constants";

export const addCommentFormSchema = z
.object({
    desc: z.string().min(1, { message: "Description is required" }),
})

export type addCommentFormData = z.infer<typeof addCommentFormSchema>;