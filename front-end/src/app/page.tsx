'use client'
//Home page
import './login.css';
import React from 'react';
import Login from "./components/loginform";
// import { createClient } from '@supabase/supabase-js'

// const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

export default function Home() {
  return (
    <div className='App'>
      <Login />
    </div> 
  )
}


