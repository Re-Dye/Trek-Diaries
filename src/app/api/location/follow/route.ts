import { NextRequest, NextResponse } from "next/server";
import { followLocationSchema } from "@/lib/zodSchema/followLocation";
import { ZodError } from "zod";
import { followLocation, checkFollowLocation, unfollowLocation } from "@/lib/db/actions";
import { ServerRuntime } from "next";

export const runtime: ServerRuntime = "edge";

export async function POST(req: NextRequest) {
  try {
    const data = followLocationSchema.parse(await req.json());

    const hasFollowed: boolean = await checkFollowLocation(data);

    if (data.action === "follow" && hasFollowed) {
      return NextResponse.json("User has already followed this location", {
        status: 409,
      });
    }

    if (data.action === "unfollow" && !hasFollowed) {
      return NextResponse.json("User has not followed this location", {
        status: 409,
      });
    }

    if (data.action === "follow") {
      await followLocation(data);
      return NextResponse.json("Follow location success", { status: 201 });
    }

    if (data.action === "unfollow") {
      await unfollowLocation(data);
      return NextResponse.json("Unfollow location success", { status: 201 });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Invalid Request", error);
      return NextResponse.json("Invalid Request", { status: 400 });
    }
    console.error("Error in following location", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
