"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
// import ViewComment from "../../../../components/viewComment/viewComment";
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
