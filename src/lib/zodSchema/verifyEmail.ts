import { z } from "zod";

export const verifyEmailSchema = z.object({
  id: z.string().length(36),
  token: z.string().length(64),
});

export type VerifyEmail = z.infer<typeof verifyEmailSchema>;