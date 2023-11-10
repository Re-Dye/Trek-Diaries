"use client";
import React, { useState } from "react";
import forgetStyles from "../reset-password/page.module.css";
import Link from "next/link";
import axios from "axios";
import { toast, useToast } from "@/components/ui/use-toast";

export default function ResetPassword() {
  const {toast} = useToast()
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    console.log(email);
    try {
      const { data } = await axios.post("/api/forgot_password", {
        email,
      });

      console.log(data);
      toast({
        className: "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
        title: "Verification Email Sent",
        description: (`Verification email sent to: ${email}`)
      })
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={forgetStyles.wrapper}>
      <form onSubmit={handleForgot} className={forgetStyles.forgetBox}>
        <h1>Forgot Your Password ?</h1>
        <p>Please enter the email you use to sign in to Trek-Diaries</p>
        <input
          className={forgetStyles.inpforget}
          type="email"
          id="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className={forgetStyles.resetbtn}>
          Reset Password
        </button>
        <Link className={forgetStyles.linkforget} href="/login">
          Back to sign in
        </Link>
      </form>
    </div>
  );
}
