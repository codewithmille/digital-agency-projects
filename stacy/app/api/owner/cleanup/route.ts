import { NextResponse } from "next/server";
import { del } from "@vercel/blob";
import { isOwnerAuthenticated } from "@/app/lib/owner-auth";
import { getBlobReadWriteToken } from "@/app/lib/env";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isOwnerAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const token = getBlobReadWriteToken();
  if (!token) {
    return NextResponse.json(
      { message: "Vercel Blob is not configured." },
      { status: 503 },
    );
  }

  try {
    const { urls } = (await request.json()) as { urls: string[] };

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ message: "No URLs provided for cleanup." });
    }

    // Only delete valid Vercel Blob URLs
    const validUrls = urls.filter((url) =>
      url.includes(".blob.vercel-storage.com"),
    );

    if (validUrls.length > 0) {
      await del(validUrls, { token });
      return NextResponse.json({
        message: `Successfully cleaned up ${validUrls.length} assets.`,
        cleaned: validUrls,
      });
    }

    return NextResponse.json({ message: "No Vercel Blob URLs found to clean up." });
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json(
      { message: "Failed to clean up assets." },
      { status: 500 },
    );
  }
}
