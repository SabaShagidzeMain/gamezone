import { supabase } from "@/utilities/supabase/supabase";

export const fetchFeatured = async () => {
  try {
    const { data, error } = await supabase
      .from("games_admin")
      .select("*")
      .contains("tags_array", ["Featured"]);

    if (error) throw error;

    return data.reverse();
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};
