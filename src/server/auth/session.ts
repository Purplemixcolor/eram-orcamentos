import { cookies } from "next/headers";
import { users } from "@/lib/demo-data";
import type { AppUser } from "@/lib/types";

const COOKIE_NAME = "eram_session";

export async function getCurrentUser(): Promise<AppUser | null> {
  const jar = await cookies();
  const userId = jar.get(COOKIE_NAME)?.value;
  return users.find((user) => user.id === userId && user.active) ?? null;
}

export async function setSession(userId: string) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, userId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/"
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}
