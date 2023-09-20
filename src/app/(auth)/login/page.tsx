import { Metadata } from "next";
import Login from "./components/login_form";

export const metadata: Metadata = {
  title: 'Login | TrekDiaries',
  description: 'Login page of TrekDiaries',
}

export default function Page() {
  return (
    <div>
      <Login />
    </div>
  );
}