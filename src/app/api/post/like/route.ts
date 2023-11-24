import { NextRequest, NextResponse } from "next/server";
import { likePostSchema, LikePost } from "@/lib/zodSchema/likePost";
import { ServerRuntime } from "next";
import { isPostLiked, likePost, postExists } from "@/lib/db/actions";
import { ZodError } from "zod";

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

export async function GET(req: NextRequest) { 
  try {
    const searchParams = req.nextUrl.searchParams;
    const userId: string | null = searchParams.get("userId");
    const postId: string | null = searchParams.get("postId");
    
    if (!userId || !postId) {
      return new Response("Invalid Request", { status: 400 });
    }

    const data: LikePost = { userId, postId };
    const isLiked: boolean = await isPostLiked(data);
    return NextResponse.json(JSON.stringify({ isLiked }), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}