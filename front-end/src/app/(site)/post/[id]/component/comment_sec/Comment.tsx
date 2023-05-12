"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import InfiniteScroll from "react-infinite-scroll-component";
import ViewComment from "../comment/viewComment";
import commentStyle from "./page.module.css";

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
  const router = useRouter();

  /* Sessions is used to extract email from the users... */
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const handleComment = async (e: any) => {
    e.preventDefault();
    console.log(comment, session?.data?.user?.email, postId);
    var email: any = session?.data?.user?.email;
    const encodedComment = encodeURI(comment);
    const encodedEmail = encodeURI(email);
    const encodedPostId = encodeURI(postId);
    const data: any = await fetch(
      `https://ap-south-1.aws.data.mongodb-api.com/app/trek-diaries-bmymy/endpoint/postComment?email=${encodedEmail}&content=${encodedComment}&postId=${encodedPostId}`,
      {
        method: "POST",
        cache: "no-store",
      }
    );
  };

  const [comments, fetchComments, hasMore, didMount] = useFetchComments(postId);
  return (
    <div className={commentStyle.wrapper}>
      <div className={commentStyle.commentText}>
        <form onSubmit={handleComment} className={commentStyle.commentSection}>
          <textarea
            name="text"
            id="description"
            placeholder="Comment"
            className={commentStyle.commentBox}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Submit Comment</button>
        </form>
      </div>
      <div className={commentStyle.PostBody}>
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
            {!comments.length && <h1>Not Found!</h1>}
          </>
        )}
        {!didMount}
      </div>
    </div>
  );
}

function useFetchComments(
  PostId: string
): [
  Comments: Array<Comment>,
  fetchComments: Function,
  hasMore: boolean,
  didMount: boolean
] {
  const page = useRef<number>(0);
  const searchTime = useRef<Date>(new Date());
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [didMount, setDidMount] = useState<boolean>(false);

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

  return [comments, fetchComments, hasMore, didMount];
}
