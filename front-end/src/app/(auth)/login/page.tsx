"use client";
//Home page

import loginStyles from "./page.module.css";
import { Metadata } from "next";
import Login from "./components/login_form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import React, { useEffect } from "react";
import type { Session } from "next-auth";

// export const metadata: Metadata = {
//   title: 'Login | TrekDiaries',
//   description: 'Login page of TrekDiaries',
// }

export default function Page() {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log(session)
    if (session.status === 'authenticated') {
      router.push('/')
    }
  }, [session])

  return (
    <div className={loginStyles.app}>
      <Login />
    </div>
  );
}