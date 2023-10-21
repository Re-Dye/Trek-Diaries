import { NextRequest, NextResponse } from "next/server";
import { insertUsersToLocationsSchema } from "@/lib/zodSchema/dbTypes";
import { ZodError } from "zod";
import { followLocation, checkFollowLocation } from "@/lib/db/actions";
import { ServerRuntime } from "next";

export const runtime: ServerRuntime = "edge";

export async function POST(req: NextRequest) {
  try {
    const data = insertUsersToLocationsSchema.parse(
      await req.json()
    );

    const hasFollowed: boolean = await checkFollowLocation(data);
    console.log(hasFollowed)

    if (hasFollowed) {
      console.log("User has already followed this location")
      return NextResponse.json("User has already followed this location", { status: 409 });
    }

    await followLocation(data);
    console.log("Follow location success")
    return NextResponse.json("Follow location success", { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Invalid Request", error);
      return NextResponse.json("Invalid Request", { status: 400 });
    }
    console.error("Error in following location", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
