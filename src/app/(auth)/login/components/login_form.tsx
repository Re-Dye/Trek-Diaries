"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ModeToggle } from "@/app/(site)/components/DarkMode/Darkmode";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must atleast 8 characters long" }),
});

type FormData = z.infer<typeof loginSchema>;

const STATUS_INCORRECT_LOGIN_CREDENTIALS = 401;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });
  const router: AppRouterInstance = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  })

  const handleSigninGoog = async () => {
    const googres = await signIn("google", {
      redirect: false,
      callbackUrl: "/",
    });
    console.log(googres);
  };

  const onLogIn: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("signing in", data);
      // const res = await signIn('credentials', { email, password, redirect: true, callbackUrl: '/feeds' })
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/",
      });

      console.log("response received");

      /* if error occured */
      if (res?.error) {
        /* if the status code matches with the incorrect login credentials status */
        if (res.status === STATUS_INCORRECT_LOGIN_CREDENTIALS) {
          console.log("The email or the password is incorrect.");
          setError("root", {
            type: "custom",
            message: "The email or the password is incorrect.",
          });
          return;
        }
        throw res.error;
      }

      console.log("log in successfull");
      router.push(res?.url as string);
      return;
    } catch (error) {
      setError("root", {
        type: "custom",
        message: "Error occured. Please try again later.",
      });
      console.log(error || "error unknown");
    }
  };

  return (
    <div className="h-screen flex flex-row sm:flex-row md:flex-row lg:flex-row xl:flex-row ">
      <div className="relative w-full sm:h-full md:h-full lg:h-full xl:h-full  border-0 shadow-black shadow-xl rounded-r-3xl">
        <Image className="object-cover w-full h-full" loading="lazy" src="/ncpr.jpg" alt="backgroundImage" fill />
      </div>
      <div className=" w-full sm:w-2/3 md:w-1/2 lg:w-1/2 xl:w-1/2 h-full flex items-center mx-4 sm:mx-8 md:mx-16 lg:mx-20 xl:mx-24">
        <div className="flex absolute top-6 right-8 sm:top-7 sm:right-10 md:top-9 md:right-20 lg:top-12 lg:right-24 xl:top-14 xl:right-28">
            <ModeToggle />
        </div>
        <div className="w-full p-4 sm:p-2 justify-center">
          <h2 className="text-3xl mb-6 sm:max-[text-4xl]: sm:mb-8 md:mb-10 lg:text-5xl xl:text-6xl font-bold text-blue-500 ">Login</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onLogIn)} className=" w-full space-y-4 justify-center items-center">
              {errors && (
                <h3 className=" text-red-600 font-medium">
                  {errors.email?.message ||
                    errors.password?.message ||
                    errors.root?.message}
                </h3>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black justify-start flex">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 w-full"
                        placeholder="user@gmail.com" {...field}
                        type="text"
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
                    <FormLabel className="text-black flex justify-start">Password</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 w-full"
                        placeholder="password" {...field}
                        type={showPassword ? "text" : "password"}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <input
              placeholder="Email Address"
              className={loginStyles.inputBx}
              type="text"
              {...register("email", { required: true })}
            /> */}

              {/* <br /> */}

              {/* <input
              placeholder="Password"
              className={loginStyles.inputBx}
              type={showPassword ? "text" : "password"}
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Password must contain atleast 8 characters.",
                },
              })}
            /> */}

              <div className="flex flex-col gap-2 justify-center items-center md:flex-row lg:flex-row  sm:gap-2 md:gap-4 lg:gap-5 ">
                <div className="flex space-x-1 sm:space-x-2 items-center ">
                  <Checkbox
                    id="show_password"
                    onCheckedChange={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  />
                  <label
                    htmlFor="show_password"
                    className=" text-xs font-medium leading-none cursor-pointer sm:text-sm"
                  >
                    Show Password
                  </label>
                </div>

                <div className="flex items-center">
                  <Link className="text-xs font-medium leading-none cursor-pointer hover:text-gray-400 text-blue-500 sm:text-sm" href="/reset-password">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <div>
              <Button
                variant="outline"
                className=" btn px-3 py-2 transition ease-in-out delay-100 text-xs text-white rounded-md w-full bg-cyan-600 lg:h-8 xl:h-10 "
                type="submit">Sign In</Button>
              </div>

              <div className=" flex flex-col text-xs font-medium justify-center items-center gap-1 md:flex-row sm:text-sm md:text-sm md:gap-2">
                <>Don&apos;t have an account?</>
                <Link className="text-blue-500  hover:text-gray-400" href="/sign_up"> Sign Up</Link>
              </div>

              <div>
                <Button
                  type="button"
                  variant="outline"
                  className=" btn w-full transition ease-in-out delay-100 px-3 py-2 text-xs tex rounded-md gap-x-2 text-white bg-gray-800 lg:gap-3 lg:h-8 xl:h-10"
                  onClick={handleSigninGoog}
                >
                  Continue with google
                  <FcGoogle className=" relative w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
