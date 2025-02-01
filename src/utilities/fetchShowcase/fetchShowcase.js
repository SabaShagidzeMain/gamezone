import { supabase } from "@/utilities/supabase/supabase";

export const fetchShowcase = async (category) => {
  try {
    const { data, error } = await supabase
      .from("games_admin")
      .select("*")
      .contains("tags_array", [category]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};
