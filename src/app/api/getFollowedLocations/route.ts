import type { ServerRuntime } from "next";
import { NextRequest } from "next/server";

export const runtime: ServerRuntime = "edge";

export async function GET(req: NextRequest) {
    
}