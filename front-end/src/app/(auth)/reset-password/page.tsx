"use client";
import React, { useState } from "react";
import forgetStyles from "../reset-password/page.module.css";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgot = async (e:React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    console.log(email);
    try {
      const { data } = await axios.post("/api/forgot_password", {
        email
      });

      console.log(data);
      alert(`Verification email sent to: ${email}`);

      setEmail("")

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={forgetStyles.wrapper}>
      <Image
        className={forgetStyles.img}
        src="/ncpr.jpg"
        alt="backgroundImage"
        fill
      />
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
          {/* {!loading ? 'Request Password Reset': 'Sending...'} */}
        </button>
        <Link className={forgetStyles.linkforget} href="/login">
          Back to sign in
        </Link>
      </form>
    </div>
  );
}
