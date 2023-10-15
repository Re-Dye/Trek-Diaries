"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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
    <div className="flex justify-between h-full">
      <div className="w-1/4 bg-custom_gray mt-2 border">
        </div>
      <div className="mt-2 bg-custom_gray border w-2/4 box-border">
          {session.status === "authenticated" && (
            <PostFeed email={session.data?.user?.email as string} />
          )}
      </div>
      <div className="w-1/5 bg-custom_gray border mt-2"></div>
    </div>
  );
}
