import { Metadata } from "next";
import Login from "./components/LoginForm";

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login page of TrekDiaries',
}

export default function Page() {
  return (
    <div>
      <Login />
    </div>
  );
}