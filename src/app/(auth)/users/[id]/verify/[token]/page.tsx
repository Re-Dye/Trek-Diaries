import { VerifyEmail } from "@/lib/zodSchema/verifyEmail";
import verifystyles from "./page.module.css";
import Image from "next/image";
import { BadgeCheck } from "lucide-react"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TrekDiaries | Verify Email",
  description: "Verify your email address",
}

export default async function UserVerifyPage({ params }: { params: { id: string, token: string }}) {
  const data: VerifyEmail = { id: params.id, token: params.token };
  const baseUrl = process.env.BASE_URL;
  const res = await fetch(`${baseUrl}/api/verify_email`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  let message: string;
  
  if (res.status === 201) {
    message = "Email Verified Successfully";
  } else if (res.status === 400) {
    message = "Invalid request. Please try again with valid request";
  } else if (res.status === 409) {
    message = "Email already verified";
  } else {
    message = "Something went wrong. Please try again later";
  }

  return (
    <div>
      {/* <VerifyMail /> */}
      <div className={verifystyles.wrapper}>
        {/* <Image
          className={verifystyles.img}
          src="/ncpr.jpg"
          alt="backgroundImage"
          fill
        /> */}
        <BadgeCheck className={verifystyles.icon} />
        <h1>{ message }</h1>
      </div>
    </div>
  );
}
