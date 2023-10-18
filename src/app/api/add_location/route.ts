import { AddLocationFormSchema } from "@/lib/zodSchema/addLocation";
import { NextRequest, NextResponse } from "next/server";
import { countLocationByAddress, addLocation } from "@/lib/db/actions";
import { ZodError } from "zod";
import { ServerRuntime } from "next";
import {
  getAlgoliaAdminKey,
  getAlgoliaAppId,
  getTriggerToken,
  getTriggerUrl,
} from "@/lib/secrets";
import algoliasearch from "algoliasearch";
import { ReturnLocation } from "@/lib/zodSchema/dbTypes";

// export const runtime: ServerRuntime = "edge";

export async function POST(req: NextRequest) {
  try {
    const client = algoliasearch(getAlgoliaAppId(), getAlgoliaAdminKey());
    console.log(client);
    const index = client.initIndex("locations");
    console.log(index);
    const { place, country, description, state } = AddLocationFormSchema.parse(
      await req.json()
    );
    const address = `${place}, ${state}, ${country}`;
    console.log(address);
    console.log(description);

    if ((await countLocationByAddress(address)) > 0) {
      return NextResponse.json("Location already exists", { status: 409 });
    }

    const location: ReturnLocation = await addLocation({
      address,
      description,
    });

    index.saveObject({
      objectID: location.id,
      address: location.address,
      description: location.description,
      registered_time: location.registered_time,
    });

    return NextResponse.json(JSON.stringify(location), { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json("Invalid Request", { status: 400 });
    } else {
      console.log(error);
      return NextResponse.json("Internal Server Error", { status: 500 });
    }
  }
}
