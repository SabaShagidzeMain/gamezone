import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Define types for Supabase client
interface SupabaseError {
  message: string;
  code: string;
  details: string;
}

// Initialize Supabase client
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase environment variables!");
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test the connection
const testConnection = async (): Promise<void> => {
  try {
    const { data, error }: { data: any[] | null; error: SupabaseError | null } = await supabase
      .from("games_admin")
      .select("*")
      .limit(1);
      
    if (error) throw error;
    console.log("Supabase connection test successful");
  } catch (error) {
    console.error("Supabase connection test failed:", error);
  }
};

testConnection();
