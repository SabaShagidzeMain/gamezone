"use client";

import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { SiOculus, SiNintendoswitch, SiXbox } from "react-icons/si";
import { PiGameControllerLight } from "react-icons/pi";
import { GiConsoleController } from "react-icons/gi";
import { MdDensitySmall } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

import { supabase } from "@/utilities/supabase/supabase";
import { useCart } from "@/utilities/CartContext/CartContext";

// Types
type Game = {
  id: number;
  name: string;
  price: number;
  release_date: string;
  rating: number;
  genre: string[];
  main_images: {
    disc: string;
  };
};

type PlatformLink = {
  id: string;
  href: string;
  platform: string;
  icon: JSX.Element;
  label: string;
};

const fetchPlatformGames = async (platform: string): Promise<Game[]> => {
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

    return data as Game[];
  } catch (error: any) {
    console.error("Error fetching games:", error.message);
    return [];
  }
};

const PlatformPage = () => {
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname() || "/en";
  const locale = pathname.split("/")[1] || "en";

  const platform: string = pathname.split("/").pop() || "";

  // State variables
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const { addToCart } = useCart();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(12);

  // Platform navigation links
  const gamesLinks: PlatformLink[] = [
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

    const sortFunctions: Record<string, (a: Game, b: Game) => number> = {
      name: (a, b) => a.name.localeCompare(b.name),

      releaseDateAsc: (a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime(),
      releaseDateDesc: (a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime(),
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

  // Get the current page's games
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genre = e.target.value;
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
      <div className="flex flex-wrap gap-3 h-[fit-content] md:h-[50rem] p-4 md:p-8 justify-center items-start">
        {currentGames.map((game) => (
          <div
            className="shadow-[var(--box-shadow)] w-[45%] rounded-[5px] md:w-[15%] h-[17rem] md:h-[20rem] cursor-pointer text-[var(--text-color)] flex flex-col gap-1 [transition:all_0.3s_ease-in-out] hover:scale-101"
            key={game.id}
            onClick={() =>
              router.push(`/${locale}/games/${platform}/${game.id}`)
            }
          >
            <Image
              src={game.main_images?.disc}
              alt={game.name}
              className="object-cover w-full h-[80%] rounded-tl-[5px] rounded-tr-[5px]  "
              width={350}
              height={150}
            />
            <div className="flex flex-col gap-1 p-1">
              <h2 className="font-semibold text-[.7rem] md:text-[.8rem]">
                {game.name}
              </h2>
              <div className="flex justify-between items-center text-[0.8rem]">
                <span className="text-[.8rem] md:text-[.8rem]">
                  {game.price / 100} Gel
                </span>
                <button
                  className="text-[1rem] [transition:.2s_ease-in-out] md:text-[1.4rem] cursor-pointer rounded-sm hover:text-[var(--accent-color)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(game);
                  }}
                >
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 p-4">
        <button
          className="p-2  [transition:.2s_ease-in-out] cursor-pointer hover:bg-[var(--accent-color)] bg-[var(--text-color)] text-[var(--background-color)] rounded-sm"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IoIosArrowDropleft />
        </button>
        <span>
          {currentPage} / {Math.ceil(filteredGames.length / gamesPerPage)}
        </span>
        <button
          className="p-2  [transition:.2s_ease-in-out] cursor-pointer hover:bg-[var(--accent-color)] bg-[var(--text-color)] text-[var(--background-color)] rounded-sm"
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(filteredGames.length / gamesPerPage)
          }
        >
          <IoIosArrowDropright />
        </button>
      </div>
    </div>
  );
};

export default PlatformPage;
