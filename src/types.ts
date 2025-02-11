export interface Game {
  id: number;
  name: string;
  desc: string; // Add 'desc' property
  tags_array: string[];
  video: string;
  rating: number;
  price: number;
  stripe_product_id: string;
  stripe_price_id: string;
  platform_array: string[];
  genre: string;
  main_images: {
    logo?: string;
    thumbnail?: string;
  };
  additional_images: object;
}
