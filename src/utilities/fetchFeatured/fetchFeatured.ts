import { supabase } from "@/utilities/supabase/supabase";
import { Game } from "@/types";

export const fetchFeatured = async (): Promise<Game[]> => {
  try {
    const { data, error } = await supabase
      .from("games_admin")
      .select("*") // Ensure 'desc' is included in your database
      .contains("tags_array", ["Featured"]);

    if (error) throw error;

    return data?.reverse() || [];
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};
