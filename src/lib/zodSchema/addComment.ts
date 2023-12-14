import { z } from "zod";

export const addCommentFormSchema = z
.object({
    post_id: z.string().min(1,{message: "Id is required"}),
    content: z.string().min(1, { message: "Description is required" }),
    user_id: z.string().min(1,{message: "owner is required"})
})

export type addCommentFormData = z.infer<typeof addCommentFormSchema>;