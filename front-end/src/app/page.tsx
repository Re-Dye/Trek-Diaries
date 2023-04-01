'use client'
//Home page
import styles from './page.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className={ styles.bg }></div>
      <div className={ styles.container }>
        <Login/>
      </div>
    </div>
  )
}


function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSignIn = async() => {
    console.log(email, password)
    const res = await signIn('credentials', { email: email, password: password, redirect: false })
    console.log(res)
  }

  return (
    <>
      <text className={styles.header_login}>Login</text>

      <input 
        value={ email }
        placeholder='Email Address or Mobile Number' 
        className={ styles.input_login_email } 
        type='email'
        onChange={ (e) => setEmail(e.target.value) }
      />
      
      <input 
        value={ password }
        placeholder='Password' 
        className={ styles.input_login_password } 
        type={ showPassword? 'text': 'password' }
        onChange={ (e) => setPassword(e.target.value) }
      />

      <input 
      type='checkbox' 
      id='show_password'
      onChange={ () => setShowPassword((showPassword) => !showPassword) }
      />
      <label htmlFor='show_password'>Show Password</label>
      <br />

      <input 
      type='checkbox' 
      id='keep_me_signed_in'
      // onChange={}
      />
      <label htmlFor='keep_me_signed_in'>Keep Me Signed In</label>

      <br />
      <Link href='/reset_password'>Forgot Password?</Link>

      <button onClick={ handleSignIn }>Sign In</button>
      {/* <button onClick={ signInWithGoogle }>Sign In with Google</button> */}
      <br />
      <>Don't have an account?</>
      <Link href='/sign_up'>Sign Up</Link>
    </>
  )
}
