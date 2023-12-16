import { addPreference } from "@/lib/db/actions";
import { InsertPreference, insertPreferenceSchema } from "@/lib/zodSchema/dbTypes";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const data: InsertPreference = insertPreferenceSchema.parse(await req.json());
    console.log(data);

    await addPreference(data);

    return NextResponse.json("Preference added...", { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error);
      return NextResponse.json("Invalid request", { status: 400 });
    }
    console.error(error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}