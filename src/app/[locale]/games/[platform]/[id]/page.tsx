"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utilities/supabase/supabase";
import Image from "next/image";
import GameImageGallery from "@/Components/GameImageGallery/GameImageGallery";
import handlePurchase from "@/utilities/handlePurchase/handlePurchase";
import { useCart } from "@/utilities/CartContext/CartContext";
import { FaShoppingCart } from "react-icons/fa";

interface Game {
  id: number;
  name: string;
  price: number;
  genre: string;
  rating: string;
  release_date: string;
  stripe_price_id: string;
  video: string;
  main_images: {
    logo: string;
    disc: string;
    thumbnail: string;
  };
  additional_images: {
    add1: string;
    [key: string]: string;
  };
}

interface GameDetailsProps {
  params: {
    id: string;
    platform: string;
  };
}

const GameDetails = ({ params }: GameDetailsProps) => {
  const { id, platform } = params;
  const [game, setGame] = useState<Game | null>(null);
  const [locale, setLocale] = useState("en");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const { data, error } = await supabase
          .from("games_admin")
          .select("*")
          .eq("id", id)
          .single();
        
        if (error) throw error;
        if (data) setGame(data as Game);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    const pathSegments = window.location.pathname.split("/");
    const localeFromUrl = pathSegments[1] || "en";
    setLocale(localeFromUrl);

    fetchGame();
  }, [id, platform]);

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      {/* Hero Section */}
      <div
        className="h-[20rem] sm:h-[30rem] md:h-[40rem] bg-top bg-cover w-full flex justify-center items-center"
        style={{ backgroundImage: `url(${game.additional_images.add1})` }}
      >
        <Image
          src={game.main_images.logo}
          width={800}
          height={350}
          alt="Logo"
          className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%]"
        />
      </div>

      {/* Game Details */}
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex p-2 flex-col lg:flex-row w-full justify-center items-start gap-4 sm:gap-6 md:gap-8 md:p-8">
          <div className="w-full lg:w-auto">
            <GameImageGallery
              thumbnail={game.main_images.thumbnail}
              additionalImages={
                game.additional_images
                  ? Object.values(game.additional_images)
                  : []
              }
            />
          </div>

          {/* Game Information */}
          <div className="flex flex-col gap-[0.7rem] w-full lg:w-[25rem] text-[#001219]">
            <div
              className="w-full h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${game.main_images.disc})` }}
            ></div>
            <h1 className="text-2xl sm:text-3xl font-bold">{game.name}</h1>
            <h3 className="text-xl sm:text-2xl font-semibold">
              Gel {game.price / 100}
            </h3>
            <div className="bg-[#001219] text-[#fff] rounded-[5px] flex flex-col gap-2 p-4">
              <p>Genre: {game.genre}</p>
              <p>Rating: {game.rating}</p>
              <p>Release Date: {game.release_date}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="rounded-[5px] h-10 sm:h-12 bg-[#001219] text-[#fff] cursor-pointer w-full hover:bg-[#003049] transition-colors"
                onClick={() => handlePurchase(game.stripe_price_id, locale)}
              >
                Buy Now
              </button>
              <div className="w-[6rem] flex justify-end items-center">
                <button
                  onClick={() => addToCart(game)}
                  className="cursor-pointer hover:text-[#003049] transition-colors"
                >
                  <FaShoppingCart className="text-[2rem]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Game Video */}
        <div className="w-full w-[70rem] rounded-[5px] overflow-hidden flex p-2 justify-center items-center">
          <iframe
            src={game.video}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-[15rem] md:h-[25rem] lg:h-[30rem] xl:h-[40rem]"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;