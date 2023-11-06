import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getCloudinaryApiSecret } from "@/lib/secrets";
import { Signature, signImage } from "@/lib/zodSchema/signImage";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    signImage.parse(await req.json());
    const timestamp: number = new Date().getTime();
    const apiSecret: string = getCloudinaryApiSecret();
    const signature: string = cloudinary.utils.api_sign_request(
      {
        timestamp,
        upload_preset: "nextjs",
      },
      apiSecret
    );
    const response: Signature = { signature, timestamp };
    return NextResponse.json(JSON.stringify(response), { status: 201 });
  } catch (e) {
    if (e instanceof ZodError) {
      return NextResponse.json("Invalid request", { status: 400 });
    }
    return NextResponse.json("Server error", { status: 500 });
  }
}
