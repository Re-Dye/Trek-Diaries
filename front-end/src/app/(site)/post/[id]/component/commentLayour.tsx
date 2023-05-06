"use client"
import React from "react";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function CommentLayout ({postId}:{postId:string}) {
  const [comment,setComment] = useState("")
  const router = useRouter(); 

    /* Sessions is used to extract email from the users... */
    const session = useSession({
      required: true,
      onUnauthenticated() {
          router.push("/login");
      },
    });

  const handleComment = async(e:any)=>{
    e.preventDefault();
    console.log(comment,session?.data?.user?.email,postId);
    var email: any = session?.data?.user?.email;
    const encodedComment = encodeURI(comment);
    const encodedEmail = encodeURI(email);
    const encodedPostId = encodeURI(postId);
    const data: any = await fetch(`https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/postComment?email=${encodedEmail}&content=${encodedComment}&postId=${encodedPostId}`,
    {
      method: 'POST',
      cache: 'no-store'
    })
  }
  return (
    <div className="wrapper">
      <div className="userName">
        <h3>username</h3>
      </div>
      <div className="commentText">
        <form onSubmit = {handleComment} className = "commentSection">
          <textarea 
                    name="text"
                    id="description"
                    placeholder="Comment"
                    className="commentBox"
                    onChange = {(e) => setComment(e.target.value)}
                  />
          <button type="submit">Submit Comment</button>      
        </form>
      </div>
    </div>
  );
}
