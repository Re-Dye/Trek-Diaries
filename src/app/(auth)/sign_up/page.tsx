import SignUpForm from "./components/SignUpForm"
import type { Metadata } from "next";

export const metadata:Metadata = {
  title: "Sign Up | TrekDiaries",
  description: "Sign up page of TrekDiaries"
}

export default function Page() {
  return (
    <div>
      <SignUpForm />
    </div>
  );
}