import { NextResponse } from "next/server";
import { listOwnerPosts } from "@/app/lib/owner-posts";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ slides: await listOwnerPosts() });
}
