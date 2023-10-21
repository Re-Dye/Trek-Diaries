import { getFollowedLocations } from "@/lib/db/actions";
import type { ServerRuntime } from "next";
import { NextRequest, NextResponse } from "next/server";

export const runtime: ServerRuntime = "edge";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId: string | null = searchParams.get("userId");

  if (!userId) {
    return new Response("Invalid Request", { status: 400 });
  }

  try {
    const locations = await getFollowedLocations(userId);
    return NextResponse.json(JSON.stringify(locations), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}