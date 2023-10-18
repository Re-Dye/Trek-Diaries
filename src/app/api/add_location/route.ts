import { AddLocationFormSchema } from "@/lib/zodSchema/addLocation";
import { NextRequest, NextResponse } from "next/server";
import { countLocationByAddress, addLocation } from "@/lib/db/actions";
import { ZodError } from "zod";
import { ServerRuntime } from "next";
import { getTriggerToken, getTriggerUrl } from "@/lib/secrets";

export const runtime: ServerRuntime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { place, country, description, state } = AddLocationFormSchema.parse(
      await req.json()
    );
    const address = `${place}, ${state}, ${country}`;
    console.log(address);
    console.log(description);

    if ((await countLocationByAddress(address)) > 0) {
      return NextResponse.json("Location already exists", { status: 409 });
    }

    await addLocation(address, description);

    const res = await fetch(getTriggerUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getTriggerToken(),
      },
    });

    const data = await res.json();
    console.log(data);

    if (data.status !== "success") {
      console.log(data);
      return NextResponse.json("Internal Server Error", { status: 500 });
    }

    return NextResponse.json("Location Created", { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json("Invalid Request", { status: 400 });
    } else {
      console.log(error);
      return NextResponse.json("Internal Server Error", { status: 500 });
    }
  }
}
