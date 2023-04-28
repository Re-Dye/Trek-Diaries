"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";


export default function Home() {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <div>
      {session.status === "authenticated" ? (
        <h1>Log in successful.</h1>
      ) : (
        <h1>This is home page</h1>
      )}
    </div>
  );
}
