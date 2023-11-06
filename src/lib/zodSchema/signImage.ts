import { z } from "zod";
import { CONSTANTS } from "../constants";

export const signImage = z.object({
  size: z
    .number()
    .refine(
      (size) => size > 0 && size < CONSTANTS.MAX_IMAGE_SIZE,
      "Image size must be between 0 and 5MB"
    ),
  type: z
    .string()
    .refine(
      (type) => CONSTANTS.ACCEPTED_IMAGE_TYPES.includes(type),
      `Image type must be one of: ${CONSTANTS.ACCEPTED_IMAGE_TYPES.join(", ")}`
    ),
});

export const signature = z.object({
  signature: z.string(),
  timestamp: z.number(),
});

export type Signature = z.infer<typeof signature>;