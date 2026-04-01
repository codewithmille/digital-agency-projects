import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getBlobReadWriteToken } from "@/app/lib/env";
import { isOwnerAuthenticated } from "@/app/lib/owner-auth";

export const runtime = "nodejs";

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9.-]+/g, "-").replace(/-+/g, "-");
}

export async function PUT(request: Request) {
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

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { message: "No image file was uploaded." },
      { status: 400 },
    );
  }

  try {
    const blob = await put(
      `stacy/posts/${Date.now()}-${sanitizeFilename(file.name || "image")}`,
      file,
      {
        access: "public",
        addRandomSuffix: true,
        token,
      },
    );

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
    });
  } catch {
    return NextResponse.json(
      { message: "Could not upload the image to Vercel Blob." },
      { status: 500 },
    );
  }
}
