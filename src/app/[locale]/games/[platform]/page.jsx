"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { SiOculus, SiNintendoswitch, SiXbox } from "react-icons/si";
import { PiGameControllerLight } from "react-icons/pi";
import { GiConsoleController } from "react-icons/gi";
import { MdDensitySmall } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

import { supabase } from "@/utilities/supabase/supabase";
import { useCart } from "@/utilities/CartContext/CartContext";

const fetchPlatformGames = async (platform) => {
  try {
    let query = supabase.from("games_admin").select("*");

    if (platform && platform.toLowerCase() !== "all") {
      query = query.contains("platform_array", [platform.toLowerCase()]);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching games:", JSON.stringify(error, null, 2));
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching games:", error.message);
    return [];
  }
};

const PlatformPage = () => {
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const platform = pathname.split("/").pop();

  // State variables
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { addToCart } = useCart();

  // Platform navigation links
  const gamesLinks = [
    {
      id: "ps5-games",
      href: `/${locale}/games/ps5`,
      platform: "ps5",
      icon: <PiGameControllerLight />,
      label: `PS5 ${t("header.games")}`,
    },
    {
      id: "ps4-games",
      href: `/${locale}/games/ps4`,
      platform: "ps4",
      icon: <GiConsoleController />,
      label: `PS4 ${t("header.games")}`,
    },
    {
      id: "xbox-games",
      href: `/${locale}/games/xbox`,
      platform: "xbox",
      icon: <SiXbox />,
      label: `Xbox ${t("header.games")}`,
    },
    {
      id: "nintendo-games",
      href: `/${locale}/games/nintendo`,
      platform: "nintendo",
      icon: <SiNintendoswitch />,
      label: `Nintendo ${t("header.games")}`,
    },
    {
      id: "vr-games",
      href: `/${locale}/games/vr`,
      platform: "vr",
      icon: <SiOculus />,
      label: `VR ${t("header.games")}`,
    },
    {
      id: "all-games",
      href: `/${locale}/games/all`,
      platform: "all",
      icon: <MdDensitySmall />,
      label: `${t("header.all-games")}`,
    },
  ];

  useEffect(() => {
    const fetchGames = async () => {
      const platformGames = await fetchPlatformGames(platform);
      setGames(platformGames);
      setFilteredGames(platformGames);
    };

    fetchGames();
  }, [platform]);

  // Client-side filtering: search, genres, and sort option.
  useEffect(() => {
    let updatedGames = games.filter((game) =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedGenres.length > 0) {
      updatedGames = updatedGames.filter((game) =>
        selectedGenres.every(
          (genre) => game.genre && game.genre.includes(genre)
        )
      );
    }

    const sortFunctions = {
      name: (a, b) => a.name.localeCompare(b.name),

      releaseDateAsc: (a, b) =>
        new Date(a.release_date) - new Date(b.release_date),
      releaseDateDesc: (a, b) =>
        new Date(b.release_date) - new Date(a.release_date),
      ratingAsc: (a, b) => a.rating - b.rating,
      ratingDesc: (a, b) => b.rating - a.rating,

      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
    };

    if (sortOption) {
      updatedGames = [...updatedGames].sort(sortFunctions[sortOption]);
    }

    setFilteredGames(updatedGames);
  }, [searchTerm, sortOption, games, selectedGenres]);

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div>
      {/* Console Selection */}
      <div
        className="h-[20rem] sm:h-[30rem] md:h-[40rem] w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(/images/banners/${platform}-banner.jpg)`,
        }}
      ></div>
      <div className="flex justify-center items-center">
        <ul className="list-none flex flex-wrap align-center justify-center gap-6 w-full md:gap-10 p-4 sm:p-6 md:p-8">
          {gamesLinks.map((link) => (
            <li
              key={link.id}
              className="flex flex-col text-[var(--text-color)] hover:text-[var(--accent-color)] [transition:.3s_ease-in-out]"
            >
              <Link href={link.href}>
                <div className="flex flex-col justify-center items-center text-[2rem] md:text-[2.5rem] gap-1 sm:gap-2">
                  {link.icon}
                  <span className="hidden text-[0.8rem] md:text-[1rem] md:block text-center">
                    {link.label}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Search-Sort */}
      <div className="rounded-tl-[5px] rounded-tr-[5px] flex flex-row sm:flex-row mx-4 my-[0] mt-4 mb-0 rounded-[20px] shadow-[var(--box-shadow)] text-[var(--background-color)]">
        <input  
          className="rounded-tl-[5px] text-[var(--background-color)] flex-[1] h-12 p-2 text-[0.9rem] sm:text-[1rem] border-[none] outline-[none] bg-[var(--text-color)]"
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="text-[0.9rem] sm:text-[1rem] p-2 h-12 rounded-tr-[5px] border-[none] outline-[none] bg-[var(--text-color)] text-[var(--background-color)]"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="releaseDateAsc">Release Date ↑</option>
          <option value="releaseDateDesc">Release Date ↓</option>
          <option value="ratingAsc">Rating ↑</option>
          <option value="ratingDesc">Rating ↓</option>
          <option value="priceAsc">Price ↑</option>
          <option value="priceDesc">Price ↓</option>
        </select>
      </div>

      {/* Filter by Genre */}
      <div className="bg-[var(--text-color)] flex mx-4 my-[0] flex-col gap-2 text-[var(--background-color)] p-4 rounded-bl-[5px] rounded-br-[5px] shadow-[var(--box-shadow)]">
        <h3 className="text-[1rem] sm:text-[1.1rem]">Filter by Genre:</h3>
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {["Action", "Adventure", "RPG", "Shooter"].map((genre) => (
            <label
              key={genre}
              className="flex gap-1 text-[0.8rem] sm:text-[0.9rem]"
            >
              <input
                type="checkbox"
                value={genre}
                checked={selectedGenres.includes(genre)}
                onChange={handleGenreChange}
              />
              {genre}
            </label>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="flex flex-wrap gap-4 p-4 sm:p-6 md:p-8 justify-center items-center">
        {filteredGames.map((game) => (
          <div
            className="shadow-[var(--box-shadow)] w-[45%] sm:w-48 h-50 md:h-65 cursor-pointer text-[var(--text-color)] flex flex-col gap-1 [transition:all_0.3s_ease-in-out] hover:scale-105 hover:shadow-[var(--box-shadow)] hover:bg-[var(--text-color)] hover:text-[var(--background-color)]"
            key={game.id}
            onClick={() =>
              router.push(`/${locale}/games/${platform}/${game.id}`)
            }
          >
            <Image
              className="w-full h-3/5 md:h-4/5 object-cover"
              src={game.main_images.disc}
              alt={game.name}
              width={250}
              height={270}
            />
            <div className="flex flex-col justify-between p-2 sm:p-[0.5rem] sm:h-full md:flex-row">
              <div className="flex flex-col gap-1 w-[70%]">
                <div className="w-[100%]">
                  <h2 className="text-[0.7rem] md:text-[0.8rem] font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {game.name}
                  </h2>
                </div>
                <p className="text-[0.6rem] nd:text-[0.5rem] text-[var(--accent-color)] font-bold w-90%">
                  {game.price / 100} GEL
                </p>
              </div>
              <div className="flex items-center justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event
                    addToCart(game);
                  }}
                  className="hover:text-[var(--accent-color)] [transition:0.2s_ease-in-out]"
                >
                  <FaShoppingCart size={20} className="sm:size-[25px]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformPage;
