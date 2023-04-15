"use client";
//Home page

import signupStyles from "./page.module.css";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { useSession } from "next-auth/react";

export const metadata: Metadata = {
  title: 'Sign Up | TrekDiaries',
  description: 'Sign up page of TrekDiaries',
}

export default function Page() {
  return (
    <div className={signupStyles.app}>
      <SignUp />
    </div>
  );
}

function SignUp() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log(session)
    if (session.status === 'authenticated') {
      router.push('/')
    }
  }, [session])

  const resetStates = () => {
    setShowPassword(false);
    setEmail("");
    setPassword("");
  };

  const handleSignUp = () => {
    console.log("signing up");
  };

  return (
    <div className={signupStyles.wrapper}>
      <div className={signupStyles.imgBox}>
        <Image src="/ncpr.jpg" alt="backgroundImage" fill />
      </div>

      <div className={signupStyles.loginBox}>
        <div className={signupStyles.formBox}>
          <h2>Sign Up</h2>

          <form>
            <div className={signupStyles.name}>
              <input
                value={firstName}
                placeholder="First Name"
                className={signupStyles.inputBx}
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />

              <br />

              <input
                value={lastName}
                placeholder="Last Name"
                className={signupStyles.inputBx}
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />

              <br />
            </div>

            <input
              value={email}
              placeholder="Email Address or Mobile Number"
              className={signupStyles.inputBx}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />

            <input
              value={password}
              placeholder="Password"
              className={signupStyles.inputBx}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />

            <br />

            <input
              value={confirmPassword}
              placeholder="Confirm Password"
              className={signupStyles.inputBx}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <br />

            <div className={signupStyles.chkCtn}>
              <div className={signupStyles.showCtn}>
                <input
                  type="checkbox"
                  id="show_password"
                  className={signupStyles.check}
                  onChange={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                />
                <label htmlFor="show_password">Show Password</label>
              </div>
            </div>

            {/* <Link href='/reset_password'>Forgot Password?</Link> */}

            <br />

            <button className={signupStyles.Sbtn} onClick={handleSignUp}>
              Sign Up
            </button>
            {/* <button onClick={ signInWithGoogle }>Sign In with Google</button> */}

            <br />
            <div className={signupStyles.dText}>
              <>Already have an account?&nbsp; </>
              <Link href="/login">Login</Link>
            </div>

            <div className={signupStyles.AbtnCtn}>
              <button className={signupStyles.Abtn}>
                Continue with google &nbsp;{" "}
                <FcGoogle className={signupStyles.icon} />
              </button>
              {/* <button className={signupStyles.Abtn}>
                Continue with facebook &nbsp;
                <SiFacebook className={signupStyles.icon} />
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
