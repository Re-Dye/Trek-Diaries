import { NextRequest, NextResponse } from "next/server";
import { insertUsersToLocationsSchema } from "@/lib/zodSchema/dbTypes";
import { ZodError } from "zod";
import { followLocation, checkFollowLocation } from "@/lib/db/actions";

export async function POST(req: NextRequest) {
  try {
    const data = insertUsersToLocationsSchema.parse(
      await req.json()
    );

    const hasFollowed: boolean = await checkFollowLocation(data);

    if (hasFollowed) {
      return NextResponse.json("User has already followed this location", { status: 400 });
    }

    await followLocation(data);

    return NextResponse.json("Follow location success", { status: 200 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json("Invalid Request", { status: 400 });
    }
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
