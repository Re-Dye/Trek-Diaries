"use client";
import React from "react";
import { useState} from "react";
import {
  addCommentFormSchema,
} from "@/lib/zodSchema/addComment";
import { Textarea } from "@/components/ui/textarea";
import { Button, ButtonLoading } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent } from "react";

export default function AddComment({
  postId,
  userId,
}: {
  postId: string;
  userId?: string;
}) {
  const [comment, setComment] = useState("");
  const handleComment = (e: FormEvent<HTMLFormElement>) => mutate(e);

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };
  
  const client = useQueryClient();
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
      client.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      console.log(error);
      alert(error);
    },
  });
  return (
    <div>
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
        <div className="m-4">
                {isPending ? (
                  <ButtonLoading className=" btn mt-3 px-3 py-2 transition ease-in-out delay-100 text-xs text-white rounded-md w-full bg-cyan-600 lg:h-8 xl:h-10 " />
                ) : (
                  <Button
                    className=" hover:bg-slate-500 w-44 m-auto flex align-center justify-center"
                    type="submit"
                  >
                    Comment
                  </Button>
                )}
              </div>
      </form>
    </div>
  );
}
