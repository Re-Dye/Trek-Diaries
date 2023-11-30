import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import PostFeed from "./components/PostFeed/PostFeed";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex justify-between min-h-screen mt-14 dark:bg-black bg-slate-100">
      <div className="w-1/4 bg-custom_gray mt-2 border"></div>
      <div className="mt-2 bg-custom_gray border w-2/4 box-border">
        <PostFeed userId={user.id} />
      </div>
      <div className="w-1/5 bg-custom_gray border mt-2"></div>
    </div>
  );
}
