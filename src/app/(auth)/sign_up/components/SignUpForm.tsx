"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  signupFormSchema,
  SignupFormData,
  SignupData,
} from "@/lib/zodSchema/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import bcrypt from "bcryptjs";

import { useMutation } from "react-query";

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

export default function SignUpForm() {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupFormSchema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation({
    mutationKey: "signUp",
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
        alert(`Verification email sent to: ${form.getValues().email}`);
      } else if (data.status === 409) {
        alert(`User with email ${form.getValues().email} already exists.`);
      } else if (data.status === 400) {
        alert(
          `Invalid Request. Please try again later with proper information.`
        );
      } else {
        alert(`Error occured while signing up. Please try again later.`);
      }
    },
    onError: (error) => {
      console.log(error);
      alert("Error occured while signing up. Please try again later.");
    },
  });

  const onSignUp: SubmitHandler<SignupFormData> = async (data) => {
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
    <div className="sm:w-64 md:w-72 lg:w-80">
      <div className="flex absolute top-12 right-8 sm:top-8 sm:right-12 md:right-20 lg:right-24 xl:top-14 xl:right-28">
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
            {/* {form.formState.errors && (
                <h3 className="text-red-600 font-medium">{error}</h3>)} */}

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
              {isLoading ? (
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
