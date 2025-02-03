"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchFeatured } from "@/utilities/fetchFeatured/fetchFeatured";

const FeaturedGames = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      const games = await fetchFeatured();
      setFeaturedGames(games);
      setActiveGame(games[0] || {});
      setIsLoading(false);
    };

    loadGames();
  }, []);

  const handleImageError = (name) => {
    console.error(`Failed to load logo for: ${name}`);
  };

  const { main_images, name, desc } = activeGame || {};
  const logo = main_images?.logo || "";
  const backgroundImage = main_images?.thumbnail || "";

  return (
    <div className="gw-full text-center flex flex-col gap-[1rem] pb-3 lg:gap-[1.4rem]">
      {isLoading ? (
        <div className="gap-[1rem] flex w-full flex-col items-center relative">
          {/* Main Card Shimmer */}
          <div className="w-full h-[33rem] relative overflow-hidden bg-[var(--text-color)]">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent via-30% [animation-delay:-0.5s]" />
          </div>

          {/* Thumbnails Shimmer */}
          <div className="px-3 flex justify-center gap-[10px] w-full">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-36 h-20 bg-[var(--text-color)] rounded-[10px] relative overflow-hidden ${
                  i === 0
                    ? "w-40 [box-shadow:0_0_0_4px_#9b2226] border-[2px] border-[solid] border-[#fff] p-8"
                    : ""
                }`}
              >
                <div className="w-full h-full absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent via-30%" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Thumbnail */}
          <div
            className="w-full h-[33rem] bg-cover bg-top flex flex-col justify-center items-center text-left text-[#fff] font-bold relative"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="p-[6rem] bg-[linear-gradient(to_right,_rgba(0,_0,_0,_1),_rgba(0,_0,_0,_0))] h-full w-full flex flex-col justify-between items-center">
              <div className="">
                {logo ? (
                  <Image
                    src={logo}
                    alt={`${name} Logo`}
                    width={400}
                    height={200}
                    onError={() => handleImageError(name)}
                  />
                ) : (
                  <div>No logo available</div>
                )}
              </div>
              <div className="flex items-center flex-col gap-1">
                <h2 className="text-[1.5rem]">{name}</h2>
                <p className="w-4/5 text-[0.8rem]">{desc}</p>
                <button className="w-32 h-8 bg-[#001219] rounded-[10px] border-[1px] border-[solid] border-[#fff] cursor-pointer [transition:all_0.3s_ease-in-out] hover:bg-[#9b2226]">
                  გაიგე მეტი
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="px-3 flex justify-center gap-[10px]">
            {featuredGames.map((game) => (
              <div
                key={game.id}
                className={`w-36 h-20 bg-cover cursor-pointer bg-center rounded-[10px] [transition:all_0.3s_ease-in-out] relative hover:-translate-y-4 ${
                  activeGame?.id === game.id
                    ? "w-40 [box-shadow:0_0_0_4px_#9b2226] border-[2px] border-[solid] border-[#fff] p-8"
                    : ""
                }`}
                onClick={() => setActiveGame(game)}
                style={{
                  backgroundImage: `url(${game.main_images?.thumbnail || ""})`,
                }}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedGames;
