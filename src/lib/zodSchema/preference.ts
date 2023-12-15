import { z } from "zod";
import { CONSTANTS } from "../constants";

export const preferSchema = z.object({
  type: z.enum(["easy", "moderate", "challenging"], {
    required_error: "You need to select a difficulty type.",
  }),
  trail: z.string({
    required_error: "Please select desired trail."
  }),
  dist: z.string().min(1, {
    message: "Please select desired distance (distance is in KM)",
  }),
  altid: z.string().min(2, {
    message: "Please select desired altitude (altitude is in m)",
  }),
  month: z.string({
    required_error: "Please select desired month for trekking",
  }),
  features: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one features.",
  }),
  });

export type preferData = z.infer<typeof preferSchema>;