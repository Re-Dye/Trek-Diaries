"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
// import loginStyles from "../page.module.css";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

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
    <div className="h-screen flex flex-row">
      <div className="relative w-full h-full border-0 shadow-black shadow-xl rounded-r-3xl">
        <Image className="object-cover rounded-r-3xl" loading="lazy" src="/ncpr.jpg" alt="backgroundImage" fill />
      </div>
      <div className=" mx-16 w-2/5 h-full flex items-center">
        <div className="w-full p-2 justify-center">
          <h2 className="text-5xl mb-14 font-bold text-blue-500 ">Login</h2>

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

              <div className="flex gap-5 justify-center ">
                <div className="flex space-x-2 mt-3">
                  <Checkbox
                    id="show_password"
                    onCheckedChange={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  />
                  <label
                    htmlFor="show_password"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show Password
                  </label>
                </div>

                <div className="flex mt-3 text-sm font-medium leading-none cursor-pointer hover:text-gray-400 text-blue-500">
                  <Link href="/reset-password">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <div>
              <Button
                className=" p-5 rounded-xl w-full h-10 text-md font-semibold text bg-cyan-600"
                type="submit">Sign In</Button>
              </div>

              <div className="text-sm font-medium justify-center flex gap-2">
                <>Don't have an account?</>
                <Link className="text-blue-500  hover:text-gray-400" href="/sign_up"> Sign Up</Link>
              </div>

              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="p-5 gap-x-2 rounded-xl w-full text-white bg-gray-950 h-10 font-semibold text-md"
                  onClick={handleSigninGoog}
                >
                  Continue with google
                  <FcGoogle className="w-6 h-6" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
