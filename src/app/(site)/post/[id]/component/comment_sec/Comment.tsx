"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import InfiniteScroll from "react-infinite-scroll-component";
import ViewComment from "../comment/viewComment";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { addCommentFormSchema } from "@/lib/zodSchema/addComment";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Comment {
  id: string;
  content: string;
  owner: string;
  registeredTime: any;
}

const COMMENTS_PER_SCROLL = 10;

async function fetchPostComments(
  postId: string,
  page: number,
  searchTime: Date
) {
  const encodedPost: any = encodeURI(postId);
  const encodedPage: string = encodeURI(page.toString());
  const encodedSearchTime: any = encodeURI(searchTime.toISOString());
  const res: any = await fetch(
    `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/getComments?postID=${encodedPost}&page=${encodedPage}&searchTime=${encodedSearchTime}`,
    { cache: "no-store" }
  );
  return res.json();
}

export default function Comment({ postId }: { postId: string }) {
  const [comment, setComment] = useState("");
  const [comments, fetchComments, hasMore, didMount, handleComment] = useFetchComments(postId, comment);

  const form = useForm<z.infer<typeof addCommentFormSchema>>({
    resolver: zodResolver(addCommentFormSchema),
  });
  return (
    <div className="flex-row items-center rounded-2xl p-3 shadow-md space-y-4 w-full ">
      <Form {...form}>
        {/* <form 
          className=" w-full flex gap-2 justify-center"
          onSubmit={form.handleSubmit(handleComment)}> */}
            <form 
          className=" w-full flex gap-2 justify-center">
        <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        id="message"
                        className="h-6 w-96 shadow-md"
                        placeholder="comment"
                        {...field}
                      ></Textarea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          <Button type="submit" className="w-24 mt-3 flex justify-center">Comment</Button>
        </form>
        </Form>
      <div>
        {didMount && (
          <>
            {comments.length && (
              <InfiniteScroll
                dataLength={comments.length} //This is important field to render the next data
                next={fetchComments as any}
                hasMore={hasMore}
                loader={<p>Loading...</p>}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                {comments.map((comment) => (
                  <ViewComment
                    key={comment.id}
                    owner={comment.owner}
                    content={comment.content}
                    registeredTime={comment.registeredTime}
                  />
                ))}
              </InfiniteScroll>
            )}
            <div className="flex justify-center items-center">
              {!comments.length && <h1>No comment yet!</h1>}
            </div>
          </>
        )}
        {!didMount}
      </div>
    </div>
  );
}

function useFetchComments(
  PostId: string,
  comment: string
): [
  Comments: Array<Comment>,
  fetchComments: Function,
  hasMore: boolean,
  didMount: boolean,
  handleComment: React.FormEventHandler
] {
  const page = useRef<number>(0);
  const searchTime = useRef<Date>(new Date());
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [didMount, setDidMount] = useState<boolean>(false);
  const router = useRouter();

  /* Sessions is used to extract email from the users... */
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const fetchComments = async () => {
    console.log("Fetch called");
    try {
      /* fetch more posts */
      const fetchedComments: Array<any> = await fetchPostComments(
        PostId as string,
        page.current,
        searchTime.current
      );

      /* add the locations to the existing locations */
      setComments((comments) => [...comments, ...fetchedComments]);

      /* update page and has more */
      page.current = page.current + 1;
      setHasMore(!(fetchedComments.length < COMMENTS_PER_SCROLL));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const handleComment = async (e: any) => {
    e.preventDefault();
    var email: any = session?.data?.user?.email;
    const encodedComment = encodeURI(comment);
    const encodedEmail = encodeURI(email);
    const encodedPostId = encodeURI(PostId);
    const data: Response = await fetch(
      `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/postComment?email=${encodedEmail}&content=${encodedComment}&postId=${encodedPostId}`,
      {
        method: "POST",
        cache: "no-store",
      }
    );

    if (data.ok && data.status === 200) {
      setTimeout(() => {
        page.current = 0
        searchTime.current = new Date()
        setComments([])
        setHasMore(true)
        fetchComments()
      }, 3000)
    }

    console.log(data)
  };

  useEffect(() => {
    if (!didMount) {
      try {
        const fetchComments = async () => {
          /* fetch more posts */
          const fetchedComments: Array<any> = await fetchPostComments(
            PostId as string,
            page.current,
            searchTime.current
          );

          console.log(fetchedComments);
          /* add the locations to the existing locations */
          setComments(fetchedComments);

          /* update page and has more */
          page.current = 1;
          setHasMore(!(fetchedComments.length < COMMENTS_PER_SCROLL));
          setDidMount(true);
        };
        fetchComments();
      } catch (error) {
        alert(error);
        console.error(error);
      }
    }
  }, []);

  return [comments, fetchComments, hasMore, didMount, handleComment];
}
