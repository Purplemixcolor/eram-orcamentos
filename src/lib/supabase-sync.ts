import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://zecpfnxpeeejdnhkcwdt.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_lJpsJu-6vS9t9EW98yYt3g_fncBDMf7";

let client: SupabaseClient | null = null;

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  client ??= createClient(url, anonKey);
  return client;
}

export const ERAM_STATE_TABLE = "eram_app_state";
export const ERAM_CATEGORIES_KEY = "categories";
