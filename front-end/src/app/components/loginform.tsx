import "./style.css";
import React, {useState} from "react";
import {FcGoogle} from "react-icons/fc";
import {SiFacebook} from "react-icons/si";

export default function loginform() {

    return (
      <div className="logform">
        <text className="header_login">Login</text>
        
        <input type='text' className='input' placeholder='Email Address or Mobile Number'></input> 
        <input type="password" className="input" placeholder="password"></input>
  
        <button className='signin-btn'>Sign In</button>
        {/* <button onClick={ () => signInWithGoogle }>Sign In with Google</button> */}
        <label>
        <span>Keep me logged in</span>
        <input type='checkbox' className="check_signin"
        // onChange={} 
        />
        </label>
        <a href="#" target='_blank'>Forgot Password?</a>
        <p>don't have an account yet?<a href="/route">Sign Up</a></p>
        <span>Or</span>
        <div className='alt-login'>
            <button className='alt-btn'>Continue with google <FcGoogle className='icon'/></button>
            <button className='alt-btn'>Continue with facebook <SiFacebook className='icon'/></button>
        </div> 
      </div>
    )
  }
  
  // async function signInWithGoogle() {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //   })
  // }
  
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
  