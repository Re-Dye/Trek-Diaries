'use client'
//Home page
import styles from './page.module.css'
import { useState } from 'react';
import {FcGoogle} from "react-icons/fc";
import {SiFacebook} from "react-icons/si";

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link';

export default function Home() {
  return (
    <div className={ styles.App }>
      <Login />
    </div> 
  )
}


function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSignIn = async() => {
    const res = await signIn('credentials', { email, password, redirect: true, callbackUrl: '/feeds' })
    console.log(res)
  }

  return (
    <div className= { styles.logform }>
      <text className={ styles.header_login }>Login</text>
      
      <input 
      value={ email }
      placeholder='Email Address or Mobile Number' 
      className={ styles.input } 
      type='email'
      onChange={ (e) => setEmail(e.target.value) }
      />
        
        <input 
          value={ password }
          placeholder='Password' 
          className={ styles.input }
          type={ showPassword? 'text': 'password' }
          onChange={ (e) => setPassword(e.target.value) }
        />

        <input 
        type='checkbox' 
        id='show_password'
        className={ styles.check_signin }
        onChange={ () => setShowPassword((showPassword) => !showPassword) }
        />
        <label htmlFor='show_password'>Show Password</label>
        <br />

        <input 
        type='checkbox' 
        id='keep_me_signed_in'
        className={ styles.check_signin }
        // onChange={}
        />
        <label htmlFor='keep_me_signed_in'>Keep Me Signed In</label>

        <br />
        {/* <Link href='/reset_password'>Forgot Password?</Link> */}

        <button 
        className={ styles.signin_btn }
        onClick={ handleSignIn }>Sign In</button>
        {/* <button onClick={ signInWithGoogle }>Sign In with Google</button> */}
        <br />
        <>Don't have an account?</>
        <Link href='/sign_up'>Sign Up</Link>

        <div className={ styles.alt_login }>
          <button className={ styles.alt_btn }>Continue with google <FcGoogle className='icon'/></button>
          <button className={ styles.alt_btn }>Continue with facebook <SiFacebook className='icon'/></button>
        </div> 
    </div>
  )
}

