import React from "react";
import postStyles from "./page.module.css";
import Comment from "./component/Comment";
import Post from "./component/postLayout";

async function fetchPostData(id: string) {
  const res: any = await fetch(
    `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/getaPost?postId=${id}`,
    { cache: "no-store" }
  );
  console.log("inside fetchpostdata");
  return res.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const postID: string = params.id;
  const data = await fetchPostData(postID);

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
        />
        <div className={postStyles.rComment}>
          <Comment postId={params.id} />
        </div>
      </div>
    </div>
  );
}
