"use client";
import LoadingPost from "@/app/(site)/components/LoadingPost/LoadingPost";
import ViewPost from "../../../components/viewPost/viewPost";
import { useRef, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ReturnPost, returnPostSchema } from "@/lib/zodSchema/dbTypes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

const POSTS_PER_SCROLL = 7;

interface Response {
  posts: Array<ReturnPost>;
  next: string;
}

export default function Posts({ locationId }: { locationId: string }) {
  const { ref, inView } = useInView()
  const { data, status, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }: { pageParam: string }) => {
      try {
        const res = await fetch(
          `/api/location/post?type=paginated&locationId=${locationId}&last=${pageParam}&limit=${POSTS_PER_SCROLL}`,
          {
            cache: "no-store",
            method: "GET",
          }
        );
        const status = res.status;
        if (status === 200) {
          const data: Response = JSON.parse(await res.json());
          console.log(data);
          return data;
        } else if (status === 400) {
          alert("Invalid Request. Please try again with valid parameters");
          return;
        } else {
          alert("Something went wrong. Please try again later");
          return;
        }
      } catch (error) {
        console.error(error);
        alert(error);
        return;
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage === undefined) {
        return null;
      } else {
        return lastPage.next;
      }
    },
    initialPageParam: "00000000-0000-0000-0000-000000000000",
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
      console.log("fetching");
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
          } else {
            return page.posts.map((post, i) => (
              <ViewPost
                key={i}
                id={post.id}
                location={{
                  id: post.location_id,
                  address: post.location_address,
                }}
                description={post.description}
                likes={post.likes_count}
                imageURL={post.picture_url}
                owner={{
                  id: post.owner_id,
                  name: post.owner_name,
                }}
                rating={post.rating || 0}
              />
            ));
          }
        })
      )}

      <div ref={ref}></div>
    </div>
  );
}