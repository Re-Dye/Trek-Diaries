import { z } from "zod";

export const cacheUserSchema = z.object({
    uuid: z.string(),
    email: z.string(),
    password: z.string(),
    name: z.string(),
    dob: z.string(),
});

export type CachedUser = z.infer<typeof cacheUserSchema>;