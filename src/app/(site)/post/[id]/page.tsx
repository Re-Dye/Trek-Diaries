import React from "react";
import Post from "./component/postLayout";
import { notFound } from "next/navigation";
import { ReturnPost } from "@/lib/zodSchema/dbTypes";
import { getPost } from "@/lib/db/actions";
import { getCurrentUser } from "@/lib/session";

async function fetchPostData(id: string): Promise<ReturnPost | null> {
  try {
    const res: ReturnPost = await getPost(id);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const postID: string = params.id;
  const [post, user] = await Promise.all([fetchPostData(postID), getCurrentUser()]);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex gap-1 sm:gap-4 sm:justify-between min-h-screen mt-14 dark:bg-black bg-slate-100">
      <div className="w-2/5 sm:w-1/4 bg-custom_gray mt-2 border"></div>
      <div className="mt-2 bg-custom_gray border w-3/4 sm:w-2/4 box-border">
        <Post
          userId={user?.id}
          address={post.location_address}
          locationId={post.location_id}
          name={post.owner_name}
          likes={post.likes_count}
          registeredTime={post.registered_time}
          description={post.description}
          pictureURL={post.picture_url}
          rating={{
            Accessibility: post.accessibility,
            TrailCondition: post.trail_condition,
            Weather: post.weather,
            overallScore: post.rating,
          }}
          postID={params.id}
        />
      </div>
      <div className="w-2/5 sm:w-1/4 bg-custom_gray border mt-2"></div>
    </div>
  );
}
