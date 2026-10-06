import { createClient } from '@supabase/supabase-js';
import "dotenv/config";
import { seedSweets } from "./seed.js";

// Connect to Supabase via HTTPS (bypasses all local TCP/IPv6 DNS issues)
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    realtime: {
      params: {
        eventsPerSecond: 0,
      },
    },
  }
);

const clean = (d) => ({
  name: d.name.trim(),
  category: d.category.trim(),
  price: d.price ?? null,
  description: d.description.trim(),
  details: d.details ?? null,
  image: d.image ?? null,
  emoji: d.emoji ?? null,
  tint: d.tint ?? null,
  sizes: d.sizes ? JSON.stringify(d.sizes) : null,
});

export async function listSweets() {
  const { data, error } = await supabase
    .from("sweets")
    .select("*")
    .eq("is_deleted", "N")
    .order("id", { ascending: true });
  if (error) throw error;
  return data;
}

export async function listDeletedSweets() {
  const { data, error } = await supabase
    .from("sweets")
    .select("*")
    .eq("is_deleted", "Y")
    .order("id", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getSweet(id) {
  const { data, error } = await supabase
    .from("sweets")
    .select("*")
    .eq("id", id)
    .eq("is_deleted", "N")
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createSweet(data) {
  const d = clean(data);
  const { data: inserted, error } = await supabase
    .from("sweets")
    .insert([d])
    .select("id")
    .single();
  if (error) throw error;
  return getSweet(inserted.id);
}

export async function updateSweet(id, data) {
  const d = clean(data);
  const { data: updated, error } = await supabase
    .from("sweets")
    .update(d)
    .eq("id", id)
    .eq("is_deleted", "N")
    .select("id");
  if (error) throw error;
  return updated && updated.length > 0 ? getSweet(id) : null;
}

export async function deleteSweet(id) {
  const { data, error } = await supabase
    .from("sweets")
    .update({ is_deleted: 'Y' })
    .eq("id", id)
    .eq("is_deleted", 'N')
    .select();
  if (error) throw error;
  return data && data.length > 0;
}

export async function enableSweet(id) {
  const { data, error } = await supabase
    .from("sweets")
    .update({ is_deleted: 'N' })
    .eq("id", id)
    .eq("is_deleted", 'Y')
    .select();
  if (error) throw error;
  return data && data.length > 0;
}

// Auto-seed table if it's empty
async function initDb() {
  const { count, error } = await supabase
    .from("sweets")
    .select("*", { count: 'exact', head: true });
  
  if (!error && count === 0) {
    for (const s of seedSweets) {
      const d = clean(s);
      await supabase.from("sweets").insert([d]);
    }
  }
}

initDb().catch(console.error);