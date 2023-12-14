import { NextRequest, NextResponse } from "next/server";
import { likePostSchema, LikePost } from "@/lib/zodSchema/likePost";
import { addCommentFormSchema, addCommentFormData } from "@/lib/zodSchema/addComment";
import { ServerRuntime } from "next";
import { dislikePost, isPostLiked, postExists } from "@/lib/db/actions";
import { addComment } from "@/lib/db/actions";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const data: addCommentFormData = addCommentFormSchema.parse(await req.json());
    console.log(data);
    
    await addComment(data);
    // if (!(await addComment({
    //   post_id: data.post_id,
    //   content: data.content,
    //   user_id: data.user_id,
    //   registered_time: date.toString()
    // }))) {
    //   return NextResponse.json("Post already disliked", { status: 409 });
    // }

  //   const likes: number = await dislikePost(data);
    return NextResponse.json("Comment Added...", { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json("Invalid request", { status: 400 });
    }
    console.error(error);
    return NextResponse.json("Internal server error", { status: 500 });
   }
} 