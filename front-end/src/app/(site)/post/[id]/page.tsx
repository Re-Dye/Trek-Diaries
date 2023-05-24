import React from "react";
import postStyles from "./page.module.css";
import Comment from "./component/comment_sec/Comment";
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
    <div className={postStyles.wrapper}>
      <div className={postStyles.left}></div>
      <div className={postStyles.right}>
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
    </div>
  );
}
