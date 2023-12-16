"use client"
import React from "react";
import ViewComment from "@/app/(site)/components/viewComment/viewComment";
import LoadingPost from "@/app/(site)/components/LoadingPost/LoadingPost";
import { useToast } from "@/components/ui/use-toast";
import { useInView } from "react-intersection-observer";
import { CONSTANTS } from "@/lib/constants";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ReturnComment } from "@/lib/zodSchema/dbTypes";

interface Response {
    comments: Array<ReturnComment>;
    next: string;
  }

const Comment = ({
    postId
  } :{
    postId: string
  }
    ) => {
    const {toast} = useToast();
    const { ref, inView } = useInView();
    const { data, status, fetchNextPage } = useInfiniteQuery({
      queryKey: ["comments", postId],
      queryFn: async ({ pageParam }: { pageParam: string }) => {
        try {
          const res = await fetch(
            `/api/post/comment?postId=${postId}&last=${pageParam}&limit=${CONSTANTS.COMMENTS_PER_SCROLL}`,
            {
              cache: "no-store",
              method: "GET",
            }
          );
          const status = res.status;
          if (status === 200) {
            const data: Response = JSON.parse(await res.json());
            return data;
          } else if (status === 400) {
            toast({
              className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
              title: "Invalid Request",
              description: "Please try again with valid parameters."
            })
            return;
          } else {
            toast({
              variant: "destructive",
              className: "fixed rounded-md top-2 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
              description: "Something went wrong. Please try again later",
            })
            return;
          }
        } catch (error) {
          console.error(error);
          alert(error);
          return;
        }
      },
      getNextPageParam: (lastPage) =>{
        if (lastPage === undefined){
            return null;
        }else{
            return lastPage.next
        }
      },
      initialPageParam: "00000000-0000-0000-0000-000000000000",
    });

    useEffect(() => {
        if (inView) {
          fetchNextPage();
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [inView]);
    
  
    return (
        <div className="PostBody">
      {status === "pending" ? (
        <LoadingPost />
      ) : status === "error" ? (
        <h1>Something went wrong. Please try again later</h1>
      ) : (
        status === "success" &&
        data.pages.map((page, i) => {
          if (page === undefined) {
            return <h1 key={i}>Not Found!</h1>;
          } else if (page.comments.length === 0 && i === 0) {
            return <h1 key={i}>No Posts Found!</h1>;
          } {
            return page.comments.map((comment, i) => (
              <ViewComment
                key={i}
                registeredTime={ comment.registered_time }
                content={comment.content}
                owner= {comment.user_name}
              />
            ));
          }
        })
      )}
      <div ref={ref}></div>
    </div>
    );
  };
  
  export default Comment;