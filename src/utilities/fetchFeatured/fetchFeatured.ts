import { supabase } from "@/utilities/supabase/supabase";

// Define types for the game data
interface Game {
  id: number;
  name: string;
  tags_array: string[];
  video: string;
  rating: number;
  price: number;
  stripe_product_id: string;
  stripe_price_id: string;
  platform_array: string[];
  genre: string;
  main_images: object;
  additional_images: object;
}

export const fetchFeatured = async (): Promise<Game[]> => {
  try {
    const { data, error } = await supabase
      .from("games_admin")
      .select("*")
      .contains("tags_array", ["Featured"]);

    if (error) throw error;

    return data?.reverse() || [];
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};
