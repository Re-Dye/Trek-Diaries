import * as z from "zod";

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(1, {message: "First name is required"}),
    lastName: z
      .string()
      .min(1, {message: "Last name is required"}),
    password: z
      .string()
      .min(8, { message: "Length of password should be at least 8" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Length of password should be at least 8" }),
    email: z.string().email({ message: "Invalid email address" }),
    dob: z.string({ required_error: "A date of birth is required" }),
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

export type SignupFormData = z.infer<typeof signupSchema>;
