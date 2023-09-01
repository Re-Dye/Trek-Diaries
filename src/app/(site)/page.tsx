"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import mainStyles from "./page.module.css";
import PostFeed from "./components/PostFeed/PostFeed";

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
        <div className={mainStyles.post}>
          {session.status === "authenticated" && (
            <PostFeed email={session.data?.user?.email as string} />
          )}
        </div>
      </div>
      <div className={mainStyles.right}></div>
    </div>
  );
}
