'use client'
//Home page
import styles from './page.module.css'
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase_url: string = (process.env.NEXT_PUBLIC_SUPABASE_URL as string)
const supabase_anon_key: string = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string)

const supabase = createClient(supabase_url, supabase_anon_key)

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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <text className={styles.header_login}>Login</text>

      <input 
        placeholder='Email Address or Mobile Number' 
        className={ styles.input_login_email } 
        type='email'
      />
      
      <input 
        placeholder='Password' 
        className={ styles.input_login_password } 
        type={ showPassword? 'text': 'password' }
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
      <a target='_blank'>Forgot Password?</a>

      <button>Sign In</button>
      <button onClick={ signInWithGoogle }>Sign In with Google</button>
    </>
  )
}

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: '/feeds'
    }
  })
}

// async function signout() {
//   const { error } = await supabase.auth.signOut()
// }

/** for Google OAuth 2.0 
 * Google OAuth2.0 doesn't return the provider_refresh_token by default. 
 * If you need the provider_refresh_token returned, you will need to add additional query parameters: */
// async function signInWithGoogle() {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//       queryParams: {
//         access_type: 'offline',
//         prompt: 'consent',
//       },
//     },
//   })
// }
