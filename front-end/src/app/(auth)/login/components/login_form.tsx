"use client";

import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"
import Link from "next/link";
import loginStyles from "../page.module.css";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useSession } from "next-auth/react";

const loginSchema = z.object ({
  email: z.string().email(),
  password: z.string().min(8)
});

type FormData = z.infer<typeof loginSchema>;

const STATUS_INCORRECT_LOGIN_CREDENTIALS = 401;

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({ resolver: zodResolver(loginSchema) })
  const router: AppRouterInstance = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const session = useSession();

  useEffect(() => {
    console.log(session);
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session]);

  const handleSigninGoog = async () => {
      const googres = await signIn("google", {
          redirect: false,
          callbackUrl: "/",
        });
        console.log(googres);
      };
      
      
  const onLogIn: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("signing in", data)
      // const res = await signIn('credentials', { email, password, redirect: true, callbackUrl: '/feeds' })
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });

      console.log("response received")

      /* if error occured */
      if (res?.error) {
        /* if the status code matches with the incorrect login credentials status */
        if (res.status === STATUS_INCORRECT_LOGIN_CREDENTIALS) {
          console.log("The email or the password is incorrect.");
          setError("root", {
            type: "custom",
            message: "The email or the password is incorrect."
          })
          return
        }
        throw res.error
      }

      console.log("log in successfull");
      router.push(res?.url as string);
      return;
    } catch (error) {
      setError("root", {
        type: "custom", 
        message: "Error occured. Please try again later."
      })
      console.log(error || "error unknown");
    }
  };

  return (
    <div className={loginStyles.wrapper}>
      <div className={loginStyles.imgBox}>
        <Image src="/ncpr.jpg" alt="backgroundImage" fill  />
      </div>

      <div className={loginStyles.loginBox}>
        <div className={loginStyles.formBox}>
          <h2>Login</h2>

          <form onSubmit={ handleSubmit(onLogIn) }>
            {errors &&
              <h3 className={loginStyles.incorrectAlert}>{ errors.email?.message || errors.password?.message || errors.root?.message }</h3>
            }
            <input
              placeholder="Email Address"
              className={loginStyles.inputBx}
              type="text"
              { ...register("email", { required: true }) }
            />

            <br />

            <input
              placeholder="Password"
              className={loginStyles.inputBx}
              type={showPassword ? "text" : "password"}
              { ...register("password", { minLength: { value: 8, message: 'Password must contain atleast 8 characters.' } }) }
            />

            <br />
            <div className={loginStyles.chkCtn}>
              <div className={loginStyles.showCtn}>
                <input
                  type="checkbox"
                  id="show_password"
                  className={loginStyles.check}
                  onChange={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                />
                <label htmlFor="show_password">Show Password</label>
              </div>

              <div className={loginStyles.remCtn}>
                <Link className={loginStyles.forget} href='/reset-password'>Forgot Password?</Link>
              </div>
            </div>

            <br />

            <button
              className={loginStyles.Sbtn}
            >
              Sign In
            </button>

            <br />
            <div className={loginStyles.dText}>
              <>Don&apos;t have an account?&nbsp;  </>
              <Link href="/sign_up"> Sign Up</Link>
            </div>

            <div className={loginStyles.AbtnCtn}>
              <button
                type="button"
                className={loginStyles.Abtn}
                onClick={handleSigninGoog}
              >
                Continue with google &nbsp;{" "}
                <FcGoogle className={loginStyles.icon} />
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
