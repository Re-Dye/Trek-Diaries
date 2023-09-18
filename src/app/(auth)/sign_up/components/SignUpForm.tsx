"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";
import signupStyles from "../page.module.css";
import { signupSchema, SignupFormData } from "@/lib/zodSchema/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "react-query";

/* delete this */
import axios from "axios";

const ERR_MSG_PASSWORD_NOT_MATCH = "Passwords do not match.";
const ERR_MSG_PASSWORD_LENGTH = "Length of password should be at least 8";

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  /* delete this */
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword, confirmPassword, setConfirmPassword] =
    useConfirmPassword("", setError);
  const [dob, setDob] = useState<string>("");
  const disable = useDisableSignUp(
    firstName,
    lastName,
    email,
    dob,
    password,
    confirmPassword,
    error
  );

  const resetStates = () => {
    setFirstName("");
    setLastName("");
    setDob("");
    setError(null);
    setShowPassword(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  /* till here */

  const { mutate } = useMutation({
    mutationKey: "signUp",
    mutationFn: async (data: SignupFormData) => {
      const res = await fetch("/api/sign_up", {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      const status = res.status;
      return { json, status };
    },
    onSuccess: (data) => {
      console.log(data);
      alert(`Verification email sent to: ${email}`);
    },
    onError: (error) => {
      console.log(error);
      alert("Error occured while signing up. Please try again later.");
    },
  });

  const onSignUp: SubmitHandler<SignupFormData> = async (data) => mutate(data);

  const handleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  /* delete this @Shashanka */
  const handleSignUp = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("signing up");

    try {
      const { data } = await axios.post("/api/sign_up", {
        email,
        password,
        firstName,
        lastName,
        dob,
      });

      console.log(data);

      alert(`Verification email sent to: ${email}`);

      resetStates();
    } catch (error) {
      console.log(error);
    }
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
            {error && <h3 className={signupStyles.incorrectAlert}>{error}</h3>}
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
              placeholder="Email Address"
              className={signupStyles.inputBx}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />

            <input
              value={dob}
              className={signupStyles.inputBx}
              type="date"
              onChange={(e) => setDob(e.target.value)}
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
                  onChange={handleShowPassword}
                />
                <label htmlFor="show_password">Show Password</label>
              </div>
            </div>

            {/* <Link href='/reset_password'>Forgot Password?</Link> */}

            <br />

            <button
              className={signupStyles.Sbtn}
              onClick={(e) => handleSignUp(e)}
              disabled={disable}
            >
              Sign Up
            </button>
            {/* <button onClick={ signInWithGoogle }>Sign In with Google</button> */}

            <br />
            <div className={signupStyles.dText}>
              <>Already have an account?&nbsp; </>
              <Link href="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* delete this */
function useDisableSignUp(
  firstName: string,
  lastName: string,
  email: string,
  dob: string,
  password: string,
  confirmPassword: string,
  error: string | null
) {
  const [disable, setDisable] = useState<boolean>(true);

  useEffect(() => {
    if (error) {
      setDisable(true);
    } else {
      if (
        firstName.length === 0 ||
        lastName.length === 0 ||
        email.length === 0 ||
        password.length === 0 ||
        confirmPassword.length === 0 ||
        dob.length === 0
      ) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  }, [firstName, lastName, email, password, confirmPassword, error]);

  return disable;
}

/* delete this */
function useConfirmPassword(
  initialValue: string,
  setError: Dispatch<SetStateAction<string | null>>
): [
  password: string,
  setPassword: Dispatch<SetStateAction<string>>,
  confirmPassword: string,
  setConfirmPassword: Dispatch<SetStateAction<string>>
] {
  const [password, setPassword] = useState<string>(initialValue);
  const [confirmPassword, setConfirmPassword] = useState<string>(initialValue);

  useEffect(() => {
    if (password.length < 8) {
      setError(ERR_MSG_PASSWORD_LENGTH);
    } else {
      if (password !== confirmPassword) {
        setError(ERR_MSG_PASSWORD_NOT_MATCH);
      } else {
        setError(null);
      }
    }
  }, [password, confirmPassword]);

  return [password, setPassword, confirmPassword, setConfirmPassword];
}
