import { addPost, getPost, getPosts } from "@/lib/db/actions";
import { addPostRequestSchema } from "@/lib/zodSchema/addPost";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const data = addPostRequestSchema.parse(await req.json())
    await addPost({
      accessibility: data.accessibility,
      description: data.description,
      location_id: data.location_id,
      owner_id: data.owner_id,
      picture_url: data.image_url,
      trail_condition: data.trail_condition,
      weather: data.weather
    })
    return NextResponse.json("Post added", { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json("Invalid request", { status: 400 });
    }
    return NextResponse.json("Server error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type");
  const postId = req.nextUrl.searchParams.get("postId");
  const locationId = req.nextUrl.searchParams.get("locationId");
  const _limit = req.nextUrl.searchParams.get("limit");
  const last = req.nextUrl.searchParams.get("last");

  try {
    /* if type not given or not valid */
    if (!type || !(type === "single" || type === "paginated")) {
      return new Response("Invalid Request", { status: 400 });
    }
  
    /* if type is single */
    if (type === "single") {
      if (!postId) {
        return new Response("Invalid Request", { status: 400 });
      } else {
        const post = await getPost(postId);
        
        return NextResponse.json(JSON.stringify(post), { status: 200 });
      }
    }
  
    /* if type is paginated and locationId is not given */
    if (type === "paginated") {
      if (!locationId || !_limit ) {
        return new Response("Invalid Request", { status: 400 });
      } else {
        const limit = +_limit;

        if (isNaN(limit)) {
          return new Response("Invalid Request", { status: 400 });
        }

        const { posts, next } = await getPosts(locationId, limit, last);
  
        return NextResponse.json(JSON.stringify({ ...posts, next}), { status: 200 });
      }
    }

    return new Response("Invalid Request", { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}