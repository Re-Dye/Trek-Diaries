"use client";
//Home page

import loginStyles from "./page.module.css";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import bgImg from "../../../public/ncpr.jpg";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";


const STATUS_INCORRECT_LOGIN_CREDENTIALS = 401

export const metadata: Metadata = {
  title: 'Login | TrekDiaries',
  description: 'Login page of TrekDiaries',
}

export default function Home() {
  return (
    <div className={loginStyles.app}>
      <Login />
    </div>
  );
}

function Login() {

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter()

  const handleSignIn = async() => {
    // const res = await signIn('credentials', { email, password, redirect: true, callbackUrl: '/feeds' })
    const res = await signIn('credentials', { email, password, redirect: false })
    
    /* if error occured */
    if (res?.error) {
      /* if the status code matches with the incorrect login credentials status */
      if (res.status === STATUS_INCORRECT_LOGIN_CREDENTIALS) {
        return alert('The email or the password is incorrect.')
      } 
      return alert(`Some error occured.\nError code: ${ res.error }\n`)
    }

    /* navigate to feeds and reset states*/
    router.push('/feeds')
    resetStates()
    return
  }

  const resetStates = () => {
    setShowPassword(false)
    setEmail("")
    setPassword("")
  }


  const handleSignIn = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/feeds",
    });
    console.log(res);
  };
  return (

    <div className={loginStyles.wrapper}>
      <div className={loginStyles.imgBox}>
        <img src={bgImg} alt="backgroundImage" />
      </div>

      <div className={loginStyles.loginBox}>
        <div className={loginStyles.formBox}>
          <h2>Login</h2>

          <form>
            <input
              value={email}
              placeholder="Email Address or Mobile Number"
              className={loginStyles.inputBx}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />


            <input
              value={password}
              placeholder="Password"
              className={loginStyles.inputBx}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <div className={loginStyles.chkCtn}>
              <div className={loginStyles.showCtn}>
                <input
                  type="checkbox"
                  id="show_password"
                  className={loginStyles.check}
                  onChange={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                />
                <label htmlFor="show_password">Show Password</label>
              </div>

              <div className={loginStyles.remCtn}>
                <input
                  type="checkbox"
                  id="keep_me_signed_in"
                  className={loginStyles.check}
                  // onChange={}
                />
                <label htmlFor="keep_me_signed_in">Remember me</label>
              </div>
            </div>

            {/* <Link href='/reset_password'>Forgot Password?</Link> */}

            <br />

            <button className={loginStyles.Sbtn} onClick={handleSignIn}>
              Sign In
            </button>
            {/* <button onClick={ signInWithGoogle }>Sign In with Google</button> */}

            <br />
            <div className={loginStyles.dText}>
              <>Don't have an account?&nbsp; </>
              <Link href="/sign_up"> Sign Up</Link>
            </div>

            <div className={loginStyles.AbtnCtn}>
              <button className={loginStyles.Abtn}>
                Continue with google &nbsp;{" "}
                <FcGoogle className={loginStyles.icon} />
              </button>
              <button className={loginStyles.Abtn}>
                Continue with facebook &nbsp;
                <SiFacebook className={loginStyles.icon} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
