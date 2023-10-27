import { z } from "zod";
import { CONSTANTS } from "../constants";

export const signupFormSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    password: z
      .string()
      .min(CONSTANTS.MIN_PASSWORD_LENGTH, { message: "Length of password should be between 8 to 30 characters." })
      .max(CONSTANTS.MAX_PASSWORD_LENGTH, { message: "Length of password should be between 8 to 30 characters." }),
    confirmPassword: z
      .string()
      .min(CONSTANTS.MIN_PASSWORD_LENGTH, { message: "Length of password should be at least 8" })
      .max(CONSTANTS.MAX_PASSWORD_LENGTH, { message: "Length of password should be between 8 to 30 characters." }),
    email: z.string().email({ message: "Invalid email address" }),
    dob: z
      .string({ required_error: "A date of birth is required" })
      .transform((val) => new Date(val).toISOString()),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  password: z.string().length(CONSTANTS.ENCRYPTED_PASSWORD_LENGTH, { message: "Invalid password" }),
  email: z.string().email({ message: "Invalid email address" }),
  dob: z
    .string({ required_error: "A date of birth is required" })
    .datetime({ message: "Invalid date of birth" }),
});

export type SignupData = z.infer<typeof signupSchema>;
export type SignupFormData = z.infer<typeof signupFormSchema>;
