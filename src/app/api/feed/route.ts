import { getFeed } from "@/lib/db/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const _limit = req.nextUrl.searchParams.get("limit");
    const last = req.nextUrl.searchParams.get("last");

    if (!userId || !_limit || !last) {
      return new Response("Invalid Request", { status: 400 });
    } else {
      const limit = +_limit;

      if (isNaN(limit)) {
        return new Response("Invalid Request", { status: 400 });
      }

      const { posts, next } = await getFeed(userId, limit, last);

      return NextResponse.json(JSON.stringify({ posts, next }), {
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}