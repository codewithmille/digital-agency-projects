import { NextResponse } from "next/server";
import { isBlobConfigured } from "@/app/lib/env";
import {
  clearOwnerSession,
  createOwnerSession,
  isOwnerAuthenticated,
  verifyOwnerPassword,
} from "@/app/lib/owner-auth";
import { isMongoConfigured } from "@/app/lib/mongodb";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    authenticated: await isOwnerAuthenticated(),
    mongodbConfigured: isMongoConfigured(),
    blobConfigured: isBlobConfigured(),
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const password = body.password?.trim() || "";

  if (!verifyOwnerPassword(password)) {
    return NextResponse.json(
      { message: "Wrong password. Try again." },
      { status: 401 },
    );
  }

  await createOwnerSession();

  return NextResponse.json({
    authenticated: true,
    mongodbConfigured: isMongoConfigured(),
    blobConfigured: isBlobConfigured(),
  });
}

export async function DELETE() {
  await clearOwnerSession();
  return NextResponse.json({ authenticated: false });
}
