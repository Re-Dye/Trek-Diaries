"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
// import ViewComment from "../comment/viewComment";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import {
  addCommentFormSchema,
  addCommentFormData,
} from "@/lib/zodSchema/addComment";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";

export default function Comment({
  postId,
  userId,
}: {
  postId: string;
  userId?: string;
}) {
  const [comment, setComment] = useState("");
  //   const [comments, fetchComments, hasMore, didMount, handleComment] = useFetchComments(postId, comment);

  const handleComment = (e: FormEvent<HTMLFormElement>) => mutate(e);

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const Comment = {
        post_id: postId,
        content: comment,
        user_id: userId,
      };
      if (addCommentFormSchema.safeParse(Comment).success) {
        console.log("success!!!");
        const res = await fetch("/api/post/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Comment),
        });
        console.log(res);
      }
      setComment("");
    },
    onError: (error) => {
      console.log(error);
      alert(error);
    },
  });
  return (
    <div className="flex-row items-center rounded-2xl p-3 shadow-md space-y-4 w-full ">
      <form
        className=" w-full flex gap-2 justify-center"
        onSubmit={handleComment}
      >
        <Textarea
          id="message"
          className="h-6 w-96 shadow-md"
          placeholder="comment"
          onChange={handleCommentChange}
          value={comment}
        ></Textarea>
        <Button type="submit" className="w-24 mt-3 flex justify-center">
          Comment
        </Button>
      </form>
    </div>
  );
}

// function useFetchComments(
//   PostId: string,
//   comment: string
// ): [
//   Comments: Array<Comment>,
//   fetchComments: Function,
//   hasMore: boolean,
//   didMount: boolean,
//   handleComment: React.FormEventHandler
// ] {
//   const page = useRef<number>(0);
//   const searchTime = useRef<Date>(new Date());
//   const [comments, setComments] = useState<Array<Comment>>([]);
//   const [hasMore, setHasMore] = useState<boolean>(true);
//   const [didMount, setDidMount] = useState<boolean>(false);
//   const router = useRouter();

//   const fetchComments = async () => {
//     console.log("Fetch called");
//     try {
//       /* fetch more posts */
//       const fetchedComments: Array<any> = await fetchPostComments(
//         PostId as string,
//         page.current,
//         searchTime.current
//       );

//       /* add the locations to the existing locations */
//       setComments((comments) => [...comments, ...fetchedComments]);

//       /* update page and has more */
//       page.current = page.current + 1;
//       setHasMore(!(fetchedComments.length < COMMENTS_PER_SCROLL));
//     } catch (error) {
//       console.error(error);
//       alert(error);
//     }
//   };

//   const handleComment = async (e: any) => {
//     e.preventDefault();
//     var email: any = session?.data?.user?.email;
//     const encodedComment = encodeURI(comment);
//     const encodedEmail = encodeURI(email);
//     const encodedPostId = encodeURI(PostId);
//     const data: Response = await fetch(
//       `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/postComment?email=${encodedEmail}&content=${encodedComment}&postId=${encodedPostId}`,
//       {
//         method: "POST",
//         cache: "no-store",
//       }
//     );

//     if (data.ok && data.status === 200) {
//       setTimeout(() => {
//         page.current = 0
//         searchTime.current = new Date()
//         setComments([])
//         setHasMore(true)
//         fetchComments()
//       }, 3000)
//     }

//     console.log(data)
//   };

//   useEffect(() => {
//     if (!didMount) {
//       try {
//         const fetchComments = async () => {
//           /* fetch more posts */
//           const fetchedComments: Array<any> = await fetchPostComments(
//             PostId as string,
//             page.current,
//             searchTime.current
//           );

//           console.log(fetchedComments);
//           /* add the locations to the existing locations */
//           setComments(fetchedComments);

//           /* update page and has more */
//           page.current = 1;
//           setHasMore(!(fetchedComments.length < COMMENTS_PER_SCROLL));
//           setDidMount(true);
//         };
//         fetchComments();
//       } catch (error) {
//         alert(error);
//         console.error(error);
//       }
//     }
//   }, []);

//   return [comments, fetchComments, hasMore, didMount, handleComment];
// }

// const COMMENTS_PER_SCROLL = 10;

// async function fetchPostComments(
//   postId: string,
//   page: number,
//   searchTime: Date
// ) {
//   const encodedPost: any = encodeURI(postId);
//   const encodedPage: string = encodeURI(page.toString());
//   const encodedSearchTime: any = encodeURI(searchTime.toISOString());
//   const res: any = await fetch(
//     `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/getComments?postID=${encodedPost}&page=${encodedPage}&searchTime=${encodedSearchTime}`,
//     { cache: "no-store" }
//   );
//   return res.json();
// }
