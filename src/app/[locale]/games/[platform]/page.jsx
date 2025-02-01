"use client";

import { useEffect, useState } from "react";
import styles from "./games.module.css";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { SiOculus, SiNintendoswitch, SiXbox } from "react-icons/si";
import { PiGameControllerLight } from "react-icons/pi";
import { GiConsoleController } from "react-icons/gi";
import { MdDensitySmall } from "react-icons/md";

import { supabase } from "@/utilities/supabase/supabase";

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

  // Platform navigation links
  const gamesLinks = [
    {
      id: "ps5-games",
      href: `/${locale}/games/ps5`,
      platform: "ps5",
      icon: <PiGameControllerLight className={styles.dropdown_logo} />,
      label: `PS5 ${t("header.games")}`,
    },
    {
      id: "ps4-games",
      href: `/${locale}/games/ps4`,
      platform: "ps4",
      icon: <GiConsoleController className={styles.dropdown_logo} />,
      label: `PS4 ${t("header.games")}`,
    },
    {
      id: "xbox-games",
      href: `/${locale}/games/xbox`,
      platform: "xbox",
      icon: <SiXbox className={styles.dropdown_logo} />,
      label: `Xbox ${t("header.games")}`,
    },
    {
      id: "nintendo-games",
      href: `/${locale}/games/nintendo`,
      platform: "nintendo",
      icon: <SiNintendoswitch className={styles.dropdown_logo} />,
      label: `Nintendo ${t("header.games")}`,
    },
    {
      id: "vr-games",
      href: `/${locale}/games/vr`,
      platform: "vr",
      icon: <SiOculus className={styles.dropdown_logo} />,
      label: `VR ${t("header.games")}`,
    },
    {
      id: "all-games",
      href: `/${locale}/games/all`,
      platform: "all",
      icon: <MdDensitySmall className={styles.dropdown_logo} />,
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
      <div
        className={styles.games_banner}
        style={{
          backgroundImage: `url(/images/banners/${platform}-banner.jpg)`,
        }}
      ></div>
      <div className={styles.platform_select}>
        <ul className={styles.platform_list}>
          {gamesLinks.map((link) => (
            <li
              key={link.id}
              className={`${styles.list_item} ${styles.platform_list_item}`}
            >
              <Link href={link.href} className={styles.link_container}>
                <div className={styles.link_flex}>
                  {link.icon}
                  <span>{link.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.search_filter}>
        <input
          className={styles.search_input}
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className={styles.filter_select}
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

      <div className={styles.genre_filter}>
        <h3>Filter by Genre:</h3>
        <div className={styles.genre_options}>
          <label>
            <input
              type="checkbox"
              value="Action"
              checked={selectedGenres.includes("Action")}
              onChange={handleGenreChange}
            />
            Action
          </label>
          <label>
            <input
              type="checkbox"
              value="Adventure"
              checked={selectedGenres.includes("Adventure")}
              onChange={handleGenreChange}
            />
            Adventure
          </label>
          <label>
            <input
              type="checkbox"
              value="RPG"
              checked={selectedGenres.includes("RPG")}
              onChange={handleGenreChange}
            />
            RPG
          </label>
          <label>
            <input
              type="checkbox"
              value="Shooter"
              checked={selectedGenres.includes("Shooter")}
              onChange={handleGenreChange}
            />
            Shooter
          </label>
        </div>
      </div>

      <div className={styles.games_list}>
        {filteredGames.map((game) => (
          <div
            className={styles.game_card}
            key={game.id}
            onClick={() =>
              router.push(`/${locale}/games/${platform}/${game.id}`)
            }
          >
            <Image
              className={styles.game_image}
              src={game.main_images.disc}
              alt={game.name}
              width={250}
              height={270}
            />
            <div className={styles.gamecard_info}>
              <h2>{game.name}</h2>
              <p>{game.price / 100} GEL</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformPage;
