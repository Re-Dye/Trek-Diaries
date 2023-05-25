'use client'
import confirmstyles from "./page.module.css"
import Image from "next/image";
import Link from "next/link";
import { BsPersonFillLock } from "react-icons/bs"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from 'react'

 
export default function reset()
{
    const [password, setPassword] = useState<string>("");
    const [confirmpassword, confirmsetPassword] = useState<string>("");
    return(
        <div className={confirmstyles.wrapper}>
            <Image className={confirmstyles.img} src="/ncpr.jpg" alt="backgroundImage" fill  />
        <form className={confirmstyles.verifiedBox}>
            <h1>New Password <BsPersonFillLock className={confirmstyles.icon}/></h1>
            <p>Please create a new strong password !!</p> 
            <br />
            <input
              value={password}
              placeholder="Password"
              className={confirmstyles.inputBx}
              type="text"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
             <input
              value={confirmpassword}
              placeholder="Confirm Password"
              className={confirmstyles.inputBx}
              type="text"
              onChange={(e) => confirmsetPassword(e.target.value)}
            />
            <button className={confirmstyles.buttonVerify}> Submit </button>
        </form>
        </div>
    )
}