import React from "react";
import postStyles from "./page.module.css";
import { AiTwotoneLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import CommentLayout from "./component/commentLayour";
import Post from "./component/postLayout";

async function fetchPostData(id:string) {
  const res: any = await fetch(
    `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/getaPost?postId=${id}`,
    { cache: "no-store" }
  );
  console.log("inside fetchpostdata")
  return res.json();  
}

export default async function PostPage({ params }: {  params: { id: string };}) {
  const postID: string = params.id;
  const data = await fetchPostData(postID);
  console.log(data.owner.name)

  return (
    <div className={postStyles.wrapper}>
      <Post address = {data.location.address} 
            name = {data.owner.name}
            likes = {data.likes}
            registeredTime = {data.registeredTime}
            description = {data.description}
            pictureURL = {data.pictureURL}
            />
      <div className={postStyles.rComment}>
        <CommentLayout />
      </div>
    </div>
  );
};
