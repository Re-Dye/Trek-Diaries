import * as z from "zod";

export const signupSchema = z
  .object({
    firstName: z.string({ required_error: "First name is required" }),
    lastName: z.string({ required_error: "Last name is required" }),
    password: z
      .string()
      .min(8, { message: "Length of password should be at least 8" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Length of password should be at least 8" }),
    email: z.string().email({ message: "Invalid email address" }),
    dob: z.date({ required_error: "Date of birth is required" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match.",
      });
    }
  });

export type SignupFormData = z.infer<typeof signupSchema>;
