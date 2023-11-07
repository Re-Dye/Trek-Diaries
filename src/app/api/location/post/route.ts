import { addPost } from "@/lib/db/actions";
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