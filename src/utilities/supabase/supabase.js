import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const fetchGames = async () => {
  try {
    const { data, error } = await supabase.from("games_admin").select("*");

    if (error) {
      console.error("Error fetching games:", error);
    } else {
      const featuredGames = data.filter(
        (game) =>
          Array.isArray(game.tags_array) && game.tags_array.includes("Featured")
      );
      console.log(
        `Supabase Test: Fetched ${data.length} games, of which ${featuredGames.length} are featured.`
      );
    }
  } catch (error) {
    console.error("Error in fetching games:", error);
  }
};

fetchGames();
