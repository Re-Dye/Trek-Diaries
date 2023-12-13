import { z } from "zod";
import { CONSTANTS } from "../constants";

export const preferSchema = z.object({
  });

export type preferData = z.infer<typeof preferSchema>;