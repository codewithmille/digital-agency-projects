import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { DEFAULT_OWNER_PASSWORD } from "@/app/lib/site-content";

const OWNER_SESSION_COOKIE = "stacy-owner-session";

function getOwnerPassword() {
  return process.env.OWNER_PASSWORD || DEFAULT_OWNER_PASSWORD;
}

function getOwnerSessionValue() {
  return createHash("sha256").update(getOwnerPassword()).digest("hex");
}

export async function isOwnerAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(OWNER_SESSION_COOKIE)?.value === getOwnerSessionValue();
}

export async function createOwnerSession() {
  const cookieStore = await cookies();

  cookieStore.set(OWNER_SESSION_COOKIE, getOwnerSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearOwnerSession() {
  const cookieStore = await cookies();
  cookieStore.delete(OWNER_SESSION_COOKIE);
}

export function verifyOwnerPassword(password: string) {
  return password === getOwnerPassword();
}
