import SignUpForm from "./components/SignUpForm"
import signupStyles from "./page.module.css";
import type { Metadata } from "next";

export const metadata:Metadata = {
  title: "Sign Up | TrekDiaries",
  description: "Sign up page of TrekDiaries"
}

export default function Page() {
  return (
    <div className={signupStyles.app}>
      <SignUpForm />
    </div>
  );
}