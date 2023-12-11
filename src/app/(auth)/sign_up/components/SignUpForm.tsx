"use client";

import { useState } from "react";
import Link from "next/link";

import {
  signupFormSchema,
  SignupFormData,
  SignupData,
} from "@/lib/zodSchema/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import { ModeToggle } from "@/app/(site)/components/DarkMode/Darkmode";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button, ButtonLoading } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function SignUpForm() {

  const {toast} = useToast()
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignupData) => {
      const res = await fetch("/api/sign_up", {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const message = await res.json();
      const status = res.status;
      return { message, status };
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 201) {
        toast({
          className: "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          title: "Verification Email Sent",
          description: (`Verification email sent to: ${form.getValues().email}`)
        })
      } else if (data.status === 409) {
        toast({
          className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          title: "Email Already Exists",
          description: (`User with email ${form.getValues().email} already exists.`)
        })
      } else if (data.status === 400) {
        toast({
          className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          title: "Invalid Request",
          description: "Please try again later with proper information."
        })
      } else {
        toast({
          variant: "destructive",
          className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          title: "Error During SignUp",
          description: "Error occured while signing up. Please try again later.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "destructive",
        className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
        title: "Error During SignUp",
        description: "Error occured while signing up. Please try again later.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    },
  });

  const onSignUp: SubmitHandler<SignupFormData> = async (data) => {
    const bcrypt = (await import("bcryptjs")).default;
    const salt = await bcrypt.genSalt(10);
    const res: SignupData = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      dob: data.dob,
      password: await bcrypt.hash(data.password, salt),
    };
    console.log(res);
    mutate(res);
  };

  const handleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <div className="relative bg-black rounded-2xl p-16 sm:p-2 z-10 sm:w-64 md:w-72 lg:w-80">
      <div className="flex absolute top-12 right-8 sm:top-3 sm:right-2 xl:right-4">
        <ModeToggle />
      </div>
      <div className="w-full p-4 sm:p-2 justify-center">
        <h2 className="text-3xl mb-6 sm:max-[text-4xl]: sm:mb-8 md:mb-10 lg:text-3xl xl:text-4xl font-bold text-blue-500 ">
          Sign Up
        </h2>

        <Form {...form}>
          <form
            className=" w-full space-y-1 justify-center items-center"
            onSubmit={form.handleSubmit(onSignUp)}
          >

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="justify-start flex">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 w-full"
                      placeholder="First Name"
                      {...field}
                      type="text"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="justify-start flex">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 w-full"
                      placeholder="Last Name"
                      {...field}
                      type="text"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="justify-start flex">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 w-full"
                      placeholder="Email Address"
                      {...field}
                      type="email"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="justify-start flex">
                    Date of Birth
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 w-full"
                      placeholder="DOB"
                      {...field}
                      type="date"
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 w-full"
                      placeholder="password"
                      {...field}
                      type={showPassword ? "text" : "password"}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-start">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 w-full"
                      placeholder="Confirm Password"
                      {...field}
                      type={showPassword ? "text" : "password"}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row lg:flex-row  sm:gap-2 md:gap-4 lg:gap-5">
              <div className="flex space-x-1 sm:space-x-2 mt-3">
                <Checkbox
                  id="show_password"
                  onCheckedChange={handleShowPassword}
                />
                <label
                  htmlFor="show_password"
                  className=" text-xs font-medium leading-none cursor-pointer sm:text-sm"
                >
                  Show Password
                </label>
              </div>
            </div>

            <div>
              {isPending ? (
                <ButtonLoading className=" btn mt-3 px-3 py-2 transition ease-in-out delay-100 text-xs text-white rounded-md w-full bg-cyan-600 lg:h-8 xl:h-10 " />
              ) : (
                <Button
                  variant="outline"
                  className=" btn mt-3 px-3 py-2 h-8 transition ease-in-out delay-100 text-xs text-white rounded-md w-full bg-cyan-600 xl:h-10 "
                  type="submit"
                >
                  Sign Up
                </Button>
              )}
            </div>

            <div className="flex flex-col text-xs font-medium justify-center items-center gap-1 md:flex-row sm:text-sm md:text-sm md:gap-2">
              <>Already have an account?&nbsp; </>
              <Link className="text-blue-400 hover:text-gray-400" href="/login">
                Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
