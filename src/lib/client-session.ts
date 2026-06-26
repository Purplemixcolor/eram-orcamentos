import { users } from "@/lib/demo-data";
import type { AppUser } from "@/lib/types";

const SESSION_KEY = "eram_session";
const LEGACY_SESSION_KEY = "eram_session_user_id";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 4;

type StoredSession = {
  userId: string;
  expiresAt: number;
};

export function createClientSession(userId: string) {
  const session: StoredSession = {
    userId,
    expiresAt: Date.now() + SESSION_DURATION_MS
  };
  window.localStorage.removeItem(LEGACY_SESSION_KEY);
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearClientSession() {
  window.localStorage.removeItem(LEGACY_SESSION_KEY);
  window.sessionStorage.removeItem(SESSION_KEY);
}

export function getClientSessionUser(): AppUser | null {
  window.localStorage.removeItem(LEGACY_SESSION_KEY);
  const rawSession = window.sessionStorage.getItem(SESSION_KEY);
  if (!rawSession) return null;

  try {
    const session = JSON.parse(rawSession) as StoredSession;
    if (!session.userId || session.expiresAt <= Date.now()) {
      clearClientSession();
      return null;
    }
    return users.find((user) => user.id === session.userId && user.active) ?? null;
  } catch {
    clearClientSession();
    return null;
  }
}
