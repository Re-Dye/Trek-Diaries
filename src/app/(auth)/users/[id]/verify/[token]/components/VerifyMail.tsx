"use client";
import verifystyles from "../page.module.css";
import Image from "next/image";
import axios from "axios";
import { GoVerified } from "react-icons/go";
import { useRouter, usePathname } from "next/navigation";
import { notFound } from "next/navigation";

export default function VerifyMail() {
    const router = useRouter();
    const pathname = usePathname() as string;
    if (pathname.length === 0) {
      notFound();
    }
    let split_id = pathname.split("/");
    const required_id = split_id[2];
    const handleClick = async (e: React.MouseEvent) => {
      e.preventDefault();
      console.log("count");
      try {
        const res = await fetch("/api/verify_email", {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(required_id),
        });
        const data = await res.json();
        console.log(data);
        if (data) {
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div className={verifystyles.wrapper}>
        <Image
          className={verifystyles.img}
          src="/ncpr.jpg"
          alt="backgroundImage"
          fill
        />
        <form className={verifystyles.verifiedBox}>
          <GoVerified className={verifystyles.icon} />
          <h1>Verify Your Email Address !!</h1>
          <h2>Thank you for signing up with Trek Diaries!</h2>
          <p>
            As an extra security precaution, please verify your email address to
            continue signing up
          </p>
          <button className={verifystyles.buttonVerify} onClick={handleClick}>
            {" "}
            Verify and Continue{" "}
          </button>
        </form>
      </div>
    );
  }