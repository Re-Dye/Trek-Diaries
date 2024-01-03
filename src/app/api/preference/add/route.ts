import { addPreference, updatePreference } from "@/lib/db/actions";
import { InsertPreference, insertPreferenceSchema } from "@/lib/zodSchema/dbTypes";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const data: InsertPreference = insertPreferenceSchema.parse(await req.json());

    await addPreference(data);

    return NextResponse.json("Preference added...", { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json("Invalid request", { status: 400 });
    }
    console.error(error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data: InsertPreference = insertPreferenceSchema.parse(await req.json());

    await updatePreference(data);

    return NextResponse.json("Preference update...", { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json("Invalid request", { status: 400 });
    }
    console.error(error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}