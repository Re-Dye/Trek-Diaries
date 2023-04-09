"use client";
//Home page

import loginStyles from "./page.module.css";
import { Metadata } from "next";
import Login from "./components/login_form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: 'Login | TrekDiaries',
  description: 'Login page of TrekDiaries',
}

export default function Home() {
  const { data } = useSession()
  const router = useRouter()

  console.log(data)
  if (data) router.push('/feeds')

  return (
    <div className={loginStyles.app}>
      <Login />
    </div>
  );
}
