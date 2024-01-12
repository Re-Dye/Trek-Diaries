import { z } from "zod";

export const preferSchema = z.object({
  type: z.enum(["easy", "moderate", "challenging"], {
    required_error: "You need to select a difficulty type.",
  }),
  trail: z.string({
    required_error: "Please select desired trail.",
  }),
  distance: z
    .string()
    .min(1, {
      message: "Please select desired distance (distance is in KM)",
    })
    .refine((val) => +val > 0, { message: "Distance must be greater than 0" }),
  altitude: z
    .string()
    .min(2, {
      message: "Please select desired altitude (altitude is in m)",
    })
    .refine((val) => +val > 0, { message: "Altitude must be greater than 0" }),
  month: z.enum(
    [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "nov",
      "dec",
    ],
    {
      required_error: "Please select desired month.",
    }
  ),
  features: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one features.",
  }),
});
export type preferData = z.infer<typeof preferSchema>;