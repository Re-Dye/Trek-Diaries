import { NextRequest, NextResponse } from "next/server";
import { likePostSchema, LikePost } from "@/lib/zodSchema/likePost";
import { ServerRuntime } from "next";
import { isPostLiked, likePost, postExists } from "@/lib/db/actions";
import { ZodError } from "zod";

export const runtime: ServerRuntime = "edge";

export async function POST(req: NextRequest) {
  try {
    const data: LikePost = likePostSchema.parse(await req.json());

    
    if (!(await postExists(data.postId))) {
      return NextResponse.json("Post does not exist", { status: 404 });
    }
    
    if (await isPostLiked(data)) {
      return NextResponse.json("Post already liked", { status: 409 });
    }

    const likes: number = await likePost(data);
    return NextResponse.json(JSON.stringify({ likes }), { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json("Invalid request", { status: 400 });
    }
    console.error(error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
} 