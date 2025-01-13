"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/Components/Navbar/Navbar";
import styles from "./games.module.css";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/Components/Footer/Footer";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

import { SiOculus, SiNintendoswitch, SiXbox } from "react-icons/si";
import { PiGameControllerLight } from "react-icons/pi";
import { GiConsoleController } from "react-icons/gi";
import { MdDensitySmall } from "react-icons/md";

// Helper function to fetch and filter games
const fetchPLatformGames = async (platform) => {
  try {
    const response = await axios.get("/api/games");
    const allGames = response.data;
    return allGames.filter((game) =>
      game.platform.toLowerCase().includes(platform.toLowerCase())
    );
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};

const PlatformPage = () => {
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const platform = pathname.split("/").pop();

  // States
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);

  // Platform links
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
      href: `/${locale}/games/vr`, // Directly link to the dynamic platform route
      platform: "vr",
      icon: <SiOculus className={styles.dropdown_logo} />,
      label: `VR ${t("header.games")}`,
    },
    {
      id: "all-games",
      href: `/${locale}/games/all`, // Directly link to the dynamic platform route
      platform: "all",
      icon: <MdDensitySmall className={styles.dropdown_logo} />,
      label: `${t("header.all-games")}`,
    },
  ];

  // Fetch and set games on platform change
  useEffect(() => {
    const fetchGames = async () => {
      const platformGames = await fetchPLatformGames(platform);
      setGames(platformGames);
      setFilteredGames(platformGames);
    };
    fetchGames();
  }, [platform]);

  // Filter games based on search, genres, and sort option
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

    // Sorting logic
    const sortFunctions = {
      name: (a, b) => a.name.localeCompare(b.name),
      releaseDateAsc: (a, b) =>
        new Date(a.releaseDate) - new Date(b.releaseDate),
      releaseDateDesc: (a, b) =>
        new Date(b.releaseDate) - new Date(a.releaseDate),
      ratingAsc: (a, b) => a.rating - b.rating,
      ratingDesc: (a, b) => b.rating - a.rating,
    };

    if (sortOption) {
      updatedGames = [...updatedGames].sort(sortFunctions[sortOption]);
    }

    setFilteredGames(updatedGames);
  }, [searchTerm, sortOption, games, selectedGenres]);

  // Handle genre filter change
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
              src={game.disc}
              alt={game.name}
              width={250}
              height={270}
            />
            <div className={styles.gamecard_info}>
              <h2>{game.name}</h2>
              <p>Price</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformPage;
