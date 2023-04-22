import verifystyles from "../../verify/[token]/page.module.css"
import Image from "next/image";
import Link from "next/link";
import {GoVerified} from "react-icons/go"

export default function UserVerifyPage() {
    return (
        <div className={verifystyles.wrapper}>
            <Image className={verifystyles.img} src="/ncpr.jpg" alt="backgroundImage" fill  />
        <form className={verifystyles.verifiedBox}>
        <GoVerified className={verifystyles.icon}/>
            <h1>Account Verified !!</h1>
            <p>Your account has been verified!</p>
            <Link className={verifystyles.linkverify} href='/login'>Go to sign in</Link>
        </form>
        </div>
    )
}