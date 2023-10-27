import { z } from "zod";
import { usersToLocationsSchema } from "./dbTypes";

export type Action = "follow" | "unfollow";

export const followLocationSchema = usersToLocationsSchema.merge(
  z.object({
    action: z.custom<Action>((val) => val === "follow" || val === "unfollow"),
  })
);

export type FollowLocation = z.infer<typeof followLocationSchema>;
