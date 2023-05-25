'use client'
import confirmstyles from "./page.module.css"
import Image from "next/image";
import Link from "next/link";
import { BsPersonFillLock } from "react-icons/bs"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";

const ERR_MSG_PASSWORD_NOT_MATCH = "Passwords do not match.";
const ERR_MSG_PASSWORD_LENGTH = "Length of password should be at least 8";

export default function reset()
{
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword, confirmPassword, setConfirmPassword] =
    useConfirmPassword("", setError);
    const disable = useDisableSignUp(
        password,
        confirmPassword,
        error
      );
    
    const router: any = useRouter()
    const pathname: any = usePathname();
    let split_id = pathname.split('/');
    const required_id: any = split_id[2];
    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault();
        try {
          const { data } = await axios.post("/api/change_password", {
            password,
            required_id
          });

          if(data){
            alert(`Password has been changed successfully. Thank you!`);
            router.push('/login')
          }
           
        } catch (error) {
          console.log(error);
        }
    }
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
              value={confirmPassword}
              placeholder="Confirm Password"
              className={confirmstyles.inputBx}
              type="text"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <h3 className={confirmstyles.incorrectAlert}>{error}</h3>}
            <button 
              className={confirmstyles.buttonVerify} 
              onClick={handleSubmit}
              type = "submit" 
              disabled={disable}> Submit </button>
        </form>
        </div>
    )
}

function useConfirmPassword(
    initialValue: string,
    setError: Dispatch<SetStateAction<string | null>>
  ): [
    password: string,
    setPassword: Dispatch<SetStateAction<string>>,
    confirmPassword: string,
    setConfirmPassword: Dispatch<SetStateAction<string>>
  ] {
    const [password, setPassword] = useState<string>(initialValue);
    const [confirmPassword, setConfirmPassword] = useState<string>(initialValue);
  
    useEffect(() => {
      if (password.length < 8) {
        setError(ERR_MSG_PASSWORD_LENGTH);
      } else {
        if (password !== confirmPassword) {
          setError(ERR_MSG_PASSWORD_NOT_MATCH);
        } else {
          setError(null);
        }
      }
    }, [password, confirmPassword]);
  
    return [password, setPassword, confirmPassword, setConfirmPassword];
  }


  function useDisableSignUp(
    password: string,
    confirmPassword: string,
    error: string | null
  ) {
    const [disable, setDisable] = useState<boolean>(true);
  
    useEffect(() => {
      if (error) {
        setDisable(true);
      } else {
        if (
          password.length === 0 ||
          confirmPassword.length === 0||
          password !== confirmPassword
        ) {
          setDisable(true);
        } else {
          setDisable(false);
        }
      }
    }, [password, confirmPassword, error]);

    return disable;
  }