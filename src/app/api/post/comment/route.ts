import { NextRequest, NextResponse } from "next/server";
import { addCommentFormSchema, addCommentFormData } from "@/lib/zodSchema/addComment";
import { addComment, getComments } from "@/lib/db/actions";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const data: addCommentFormData = addCommentFormSchema.parse(await req.json());
    console.log(data);
    
    await addComment(data);
    return NextResponse.json("Comment Added...", { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json("Invalid request", { status: 400 });
    }
    console.error(error);
    return NextResponse.json("Internal server error", { status: 500 });
   }
} 

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId");
  const _limit = req.nextUrl.searchParams.get("limit");
  const last = req.nextUrl.searchParams.get("last");

  try {
    /* if type is paginated and locationId is not given */
    if (!postId || !_limit || !last) {
      return new Response("Invalid Request", { status: 400 });
    } else {
      const limit = +_limit;

      if (isNaN(limit)) {
        return new Response("Invalid Request", { status: 400 });
      }

      const { comments, next } = await getComments(postId, limit, last);

      return NextResponse.json(JSON.stringify({ comments, next }), {
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}