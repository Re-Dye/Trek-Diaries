"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PostFeed from "./components/PostFeed/PostFeed";
import LoadingPost from "./components/LoadingPost/LoadingPost";

export default function Home() {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  return (
    <div className="flex justify-between min-h-screen mt-14 dark:bg-black bg-slate-100">
      <div className="w-1/4 bg-custom_gray mt-2 border"></div>
      <div className="mt-2 bg-custom_gray border w-2/4 box-border">
        {session.status === "authenticated" ? (
          <PostFeed userId={session.data?.user?.id as string} />
        ) : (
          <LoadingPost />
        )}
      </div>
      <div className="w-1/5 bg-custom_gray border mt-2"></div>
    </div>
  );
}
