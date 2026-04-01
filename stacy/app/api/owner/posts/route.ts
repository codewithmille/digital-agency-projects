import { NextResponse } from "next/server";
import { isOwnerAuthenticated } from "@/app/lib/owner-auth";
import { isMongoConfigured } from "@/app/lib/mongodb";
import { listOwnerPosts, replaceOwnerPosts } from "@/app/lib/owner-posts";
import type { SlideItem } from "@/app/lib/site-content";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isOwnerAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { message: "MongoDB is not configured." },
      { status: 503 },
    );
  }

  try {
    return NextResponse.json({ slides: await listOwnerPosts() });
  } catch {
    return NextResponse.json(
      { message: "Could not load owner posts from MongoDB." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  if (!(await isOwnerAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { message: "MongoDB is not configured." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as { slides?: SlideItem[] };
    const slides = Array.isArray(body.slides) ? body.slides : [];
    const savedSlides = await replaceOwnerPosts(slides);

    return NextResponse.json({ slides: savedSlides });
  } catch {
    return NextResponse.json(
      { message: "Could not save owner posts to MongoDB." },
      { status: 500 },
    );
  }
}
