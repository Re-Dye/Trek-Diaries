"use client"
import verifystyles from "./page.module.css"
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { GoVerified } from "react-icons/go"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from 'react'

export default function UserVerifyPage() {
    return (
        <div>
        <VerifyMail/>
        </div>
    )
}

function VerifyMail() {
    const router: any = useRouter()
    const pathname: any = usePathname();
    let split_id = pathname.split('/');
    const required_id: any = split_id[2];
    const handleClick = async (e: React.MouseEvent) =>{
        e.preventDefault();
        console.log("count")
        try {
            const { data } = await axios.post('/api/verify_email',{ required_id })
            console.log(data)
            if(data)
            {
                router.push('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className={verifystyles.wrapper}>
            <Image className={verifystyles.img} src="/ncpr.jpg" alt="backgroundImage" fill  />
        <form className={verifystyles.verifiedBox}>
        <GoVerified className={verifystyles.icon}/>
            <h1>Verify Your Email Address !!</h1>
            <h2>Thank you for signing up with Trek Diaries!</h2>
            <p>As an extra security precaution, please verify your email address to continue signing up</p>
            <button className={verifystyles.buttonVerify} onClick = {(e)=>{handleClick(e)}}> Verify and Continue </button>
        </form>
        </div>
    )
}

