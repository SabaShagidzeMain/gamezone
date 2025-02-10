"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { fetchShowcase } from "@/utilities/fetchShowcase/fetchShowcase";

interface Game {
  id: string;
  name: string;
  main_images?: {
    disc: string;
  };
}

const GameShowcase: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [category, setCategory] = useState<"New" | "Coming Soon">("New");
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const t = useTranslations();
  const pathname = usePathname() || "/en";
  const locale = pathname.split("/")[1] || "en";
  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      const data: Game[] = await fetchShowcase(category);
      setGames(data);
      setLoading(false);
    };

    loadGames();
  }, [category]);

  return (
    <div className="flex flex-col items-center p-4 md:p-8 lg:px-12 py-3 gap-4 min-h-[400px] md:min-h-[600px]">
      {/* Category Buttons - Responsive */}
      <div className="w-full max-w-[400px] md:max-w-[500px] border-4 border-solid border-[var(--text-color)] rounded-[25px] flex justify-center items-center gap-2">
        <button
          className={`rounded-[20px] px-4 py-2 md:px-6 md:py-3 text-sm md:text-base w-1/2 transition-all duration-300 ${
            category === "New"
              ? "bg-[var(--text-color)] text-[var(--background-color)]"
              : "bg-[var(--background-color)] text-[var(--text-color)] hover:shadow-[var(--box-shadow)] cursor-pointer"
          }`}
          onClick={() => setCategory("New")}
        >
          {t("game-showcase.new")}
        </button>
        <button
          className={`rounded-[20px] px-4 py-2 md:px-6 md:py-3 text-sm md:text-base w-1/2 transition-all duration-300 ${
            category === "Coming Soon"
              ? "bg-[var(--text-color)] text-[var(--background-color)]"
              : "bg-[var(--background-color)] text-[var(--text-color)] hover:shadow-[var(--box-shadow)] cursor-pointer"
          }`}
          onClick={() => setCategory("Coming Soon")}
        >
          {t("game-showcase.coming")}
        </button>
      </div>

      {/* Game Cards Grid - Responsive */}
      <div className="w-full px-1 max-w-screen-2xl sm:px-1">
        <div className="flex flex-wrap justify-center gap-2 md:gap-6 lg:gap-5">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[160px] md:w-[180px] aspect-[3/4] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl m-2"
                >
                  <div className="w-full h-3/4 bg-[var(--text-color)] relative overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  </div>
                  <div className="p-2 h-1/4 bg-[var(--background-secondary)] relative overflow-hidden">
                    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                </div>
              ))
            : games.map((game) => (
                <div
                  key={game.id}
                  className={`cursor-pointer shadow-[var(--box-shadow)] w-[160px] md:w-[180px] aspect-[3/4] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl m-2 ${
                    hoveredCardId && hoveredCardId !== game.id
                      ? "opacity-50"
                      : ""
                  }`}
                  onMouseEnter={() => setHoveredCardId(game.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                >
                  <div
                    className="w-full h-3/4 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${game.main_images?.disc})`,
                    }}
                  />
                  <div className="h-1/4 p-2 bg-[var(--background-secondary)]">
                    <h3 className="text-[.7rem] font-bold md:text-[.8rem] line-clamp-2 text-center">
                      {game.name}
                    </h3>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default GameShowcase;
