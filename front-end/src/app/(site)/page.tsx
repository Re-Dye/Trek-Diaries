"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import mainStyles from "./page.module.css";
import ViewPost from "./components/viewPost/viewPost";

export default function Home() {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  return (
      <div className={mainStyles.wrapper}>
        <div className={mainStyles.left}></div>
        <div className={mainStyles.center}>
          {/* <ViewPost /> */}
        </div>
        <div className={mainStyles.right}></div>
      </div>
  );
}
