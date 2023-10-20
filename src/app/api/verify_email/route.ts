import { NextRequest, NextResponse } from "next/server";
import { findCachedUser } from "@/lib/db/actions";
import { verifyEmailSchema } from "@/lib/zodSchema/verifyEmail";
import { countUserById, insertUser, deleteCachedUser } from "@/lib/db/actions";
import { ZodError } from "zod";
import { CachedUser } from "@/lib/zodSchema/cachedUser";
import { ServerRuntime } from "next";

export const runtime: ServerRuntime = "edge";

export async function POST(req: NextRequest) {
  try{
    const data = verifyEmailSchema.parse(await req.json());

    /* check if user exists */
    const count = await countUserById(data.id);
    console.log(count)
    if (count > 0) {
      console.log("User already exists")
      return NextResponse.json("User already exists", { status: 409 });
    }

    const user: CachedUser = await findCachedUser(data.token);
    
    /* check if ids match */
    if (user.uuid !== data.id) {
      console.log("IDs don't match");
      return NextResponse.json("Internal Server Error", { status: 500 });
    }

    /* insert user in db */
    await insertUser(user);
    console.log("User Created")

    /* delete user from redis */
    await deleteCachedUser(data.token);
    console.log("User deleted from redis");

    return NextResponse.json("User Created", { status: 201 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json("Invalid Request", { status: 400 });
    }
    console.error(err);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
