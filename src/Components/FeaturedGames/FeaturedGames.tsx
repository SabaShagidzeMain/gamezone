"use client";

import React, { useEffect, useState } from "react";
import { fetchFeatured } from "@/utilities/fetchFeatured/fetchFeatured";
import { Game } from "@/types";

const FeaturedGames: React.FC = () => {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadGames = async () => {
      const games: Game[] = await fetchFeatured();
      setFeaturedGames(games);
      setActiveGame(games[0] || null);
      setIsLoading(false);
    };

    loadGames();
  }, []);

  const handleImageError = (name: string) => {
    console.error(`Failed to load logo for: ${name}`);
  };

  const logo = activeGame?.main_images?.logo || "";
  const backgroundImage = activeGame?.main_images?.thumbnail || "";

  return (
    <div className="gw-full text-center flex flex-col gap-[1rem] pb-3 lg:gap-[1.4rem]">
      {isLoading ? (
        <div className="gap-[1rem] flex w-full flex-col items-center relative">
          <div className="w-full h-[33rem] relative overflow-hidden bg-[var(--text-color)]">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent via-30% [animation-delay:-0.5s]" />
          </div>

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
          <div
            className="w-full h-full bg-cover bg-top flex flex-col justify-center items-center text-left text-[#fff] font-bold justify-between relative"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="pt-[5rem] pb-[2rem] px-[2rem] bg-[linear-gradient(to_right,_rgba(0,_0,_0,_1),_rgba(0,_0,_0,_0))] h-full w-full flex flex-col justify-between items-center">
              <div
                className="w-full h-[20rem] flex justify-center items-center bg-contain md:bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${logo})` }}
              ></div>
              <div className="flex items-center flex-col gap-1">
                <h2 className="text-center lg:text-[1.5rem]">
                  {activeGame?.name}
                </h2>
                <p className="w-4/5 text-[0.8rem]">{activeGame?.desc}</p>
                <button className="w-36 h-12 bg-[var(--background-color)] text-[var(--text-color)] text-center border-[1px] border-solid border-[var(--text-color)] rounded-[10px] lg:cursor-pointer [transition:all_0.3s_ease-in-out] hover:bg-[var(--text-color)] hover:text-[var(--background-color)]">
                  გაიგე მეტი
                </button>
              </div>
            </div>
          </div>

          <div className="px-3 flex justify-center gap-[10px]">
            {featuredGames.map((game) => (
              <div
                key={game.id}
                className={`w-36 h-20 bg-cover cursor-pointer bg-center rounded-[10px] [transition:all_0.3s_ease-in-out] relative hover:-translate-y-4 ${
                  activeGame?.id === game.id
                    ? "w-40 [box-shadow:0_0_0_4px_var(--accent-color)] border-[2px] border-[solid] border-[var(--background-color)] p-8"
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
