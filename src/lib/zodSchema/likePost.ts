import { z } from "zod";

export const likePostSchema = z.object({
  postId: z.string().uuid(),
  userId: z.string().uuid(),
});

export type LikePost = z.infer<typeof likePostSchema>;