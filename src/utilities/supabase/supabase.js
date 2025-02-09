import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase environment variables!");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("games_admin")
      .select("*")
      .limit(1);
    if (error) throw error;
    console.log("Supabase connection test successful:");
  } catch (error) {
    console.error("Supabase connection test failed:", error);
  }
};

testConnection();
