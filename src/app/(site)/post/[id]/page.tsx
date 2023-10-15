import React from "react";
import Post from "./component/postLayout";
import { notFound } from "next/navigation";

async function fetchPostData(id: string) {
  const res: Response = await fetch(
    `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/getaPost?postId=${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) return undefined
  return res.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const postID: string = params.id;
  const data = await fetchPostData(postID);
  console.log("hello", data);

  if (!data) {
    notFound()
  }

  return (
    <div className="flex justify-between h-full">
      <div className="w-1/4 bg-custom_gray mt-2 border"></div>
      <div className="mt-2 bg-custom_gray border w-2/4 box-border">
        <Post
          address={data.location.address}
          name={data.owner.name}
          likes={data.likes}
          registeredTime={data.registeredTime}
          description={data.description}
          pictureURL={data.pictureURL}
          rating = {data.rating}
          postID={params.id}
        />
      </div>
      <div className="w-1/5 bg-custom_gray border mt-2"></div>
    </div>
  );
}
