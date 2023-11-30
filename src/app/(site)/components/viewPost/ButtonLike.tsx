"use client";
import { useRef, useState } from "react";
import { LikePost } from "@/lib/zodSchema/likePost";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ThumbsUp } from "lucide-react";

type Action = "like" | "dislike";

export default function ButtonLike({ likes, postId, userId }: {likes: number, postId: string, userId: string}) {
  const [Likes, setLike] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  const actionRef = useRef<Action>("like");

  const { status } = useQuery({
    queryKey: ["isLiked", postId],
    queryFn: async () => {
      try {
        const res: Response = await fetch(
          `/api/post/like?userId=${userId}&postId=${postId}`,
          {
            method: "GET",
          }
        );
        const message = await res.json();

        if (res.status === 200) {
          const _data: { isLiked: boolean } = JSON.parse(message);
          setIsLiked(_data.isLiked);
          return;
        }

        if (res.status === 400) {
          toast({
            title: "Error",
            description:
              "Invalid request. Please try again later with valid data.",
            className:
              "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
          });
          return;
        }

        toast({
          title: "Error",
          description: "Error occured. Please try again later.",
          className:
            "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const data: LikePost = {
        postId,
        userId,
      };

      try {
        if (isLiked) {
          actionRef.current = "dislike";
          setLike((likes) => likes - 1);
          setIsLiked(false);
        } else {
          actionRef.current = "like";
          setLike((likes) => likes + 1);
          setIsLiked(true);
        }
        console.log(actionRef.current, isLiked);

        const res: Response = await fetch(`/api/post/${actionRef.current}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const message = await res.json();
        const status = res.status;
        return { message, status };
      } catch (error) {
        console.log(error);
        return;
      }
    },
    onError: (error) => {
      console.log(error);
      if (actionRef.current == "dislike") {
        setLike((likes) => likes + 1);
        setIsLiked(true);
      } else {
        setLike((likes) => likes - 1);
        setIsLiked(false);
      }
    },
    onSuccess: (data) => {
      if (data === undefined) {
        return;
      }

      if (data.status === 201) {
        const _data: { likes: number } = JSON.parse(data.message);
        setLike(_data.likes);
        setIsLiked(() => (actionRef.current === "like" ? true : false));
        return;
      }

      if (actionRef.current == "dislike") {
        setLike((likes) => likes + 1);
        setIsLiked(true);
      } else {
        setLike((likes) => likes - 1);
        setIsLiked(false);
      }

      if (data.status === 409) {
        toast({
          title: "Error",
          description: `Post already ${actionRef.current}d.`,
          className:
            "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
        });
        return;
      }

      if (data.status === 404) {
        toast({
          title: "Error",
          description:
            "Post not found. The post has been deleted or does not exist.",
          className:
            "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
        });
        return;
      }

      if (data.status === 400) {
        toast({
          title: "Error",
          description:
            "Invalid request. Please try again later with valid data.",
          className:
            "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
        });
        return;
      }

      toast({
        title: "Error",
        description: "Error occured. Please try again later.",
        className:
          "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
      });
    },
  });

  const handleLike = () => {
    if (isPending) {
      toast({
        title: "Error",
        description:
          "Previous request is still pending. Please wait for it to complete.",
        className:
          "fixed rounded-md top-0 left-[50%] flex max-h-screen w-full translate-x-[-50%] p-4 sm:right-0 sm:flex-col md:max-w-[420px]",
      });
    } else {
      mutate();
    }
  };

  return (
    <>
      {status === "pending" ? (
        <ReloadIcon className="w-6 h-6 animate-spin" />
      ) : (
        <button className="flex gap-2 cursor-pointer" onClick={handleLike}>
          <div className="text-xl">{Likes}</div>
          <ThumbsUp
            className={`w-6 h-6 ${isLiked ? "text-blue-600" : "text-gray-500"}`}
          />
        </button>
      )}
    </>
  );
}
