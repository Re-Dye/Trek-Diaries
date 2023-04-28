"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import SearchInput from "./components/SearchInput";
import mainStyles from "./page.module.css";
import NavBar from "./NavBar/NavBar";


export default function Home() {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/login" });
    router.push(data.url);
  };

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <div>
      {session.status === "authenticated" ? (
        <>
          <h1>Log in successful.</h1>
          <button onClick={handleSignOut}>Log out</button>
        </>
      ) : (
        <h1>This is home page</h1>
      )}
    </div>
  );
}
