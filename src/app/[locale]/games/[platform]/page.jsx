"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/Components/Navbar/Navbar";
import styles from "./games.module.css";
import Image from "next/image";

const PlatformPage = () => {
  const pathname = usePathname();
  const platform = pathname.split("/").pop();
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("/api/games");
        const allGames = response.data;

        const platformGames = allGames.filter((game) =>
          game.platform.toLowerCase().includes(platform.toLowerCase())
        );

        const gamesToShow = platformGames.length > 0 ? platformGames : allGames;
        setGames(gamesToShow);
        setFilteredGames(gamesToShow);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [platform]);

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

    if (sortOption === "name") {
      updatedGames = [...updatedGames].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortOption === "releaseDateAsc") {
      updatedGames = [...updatedGames].sort(
        (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
      );
    } else if (sortOption === "releaseDateDesc") {
      updatedGames = [...updatedGames].sort(
        (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
      );
    } else if (sortOption === "ratingAsc") {
      updatedGames = [...updatedGames].sort((a, b) => a.rating - b.rating);
    } else if (sortOption === "ratingDesc") {
      updatedGames = [...updatedGames].sort((a, b) => b.rating - a.rating);
    }

    setFilteredGames(updatedGames);
  }, [searchTerm, sortOption, games, selectedGenres]);

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(genre)
        ? prevSelectedGenres.filter((g) => g !== genre)
        : [...prevSelectedGenres, genre]
    );
  };

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div
        className={styles.games_banner}
        style={{
          backgroundImage: `url(/images/banners/${platform}-banner.jpg)`,
        }}
      ></div>
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
          <div key={game.id} className={styles.game_card}>
            <Image
              classname={styles.game_image}
              src={game.disc}
              alt={game.name}
              width={200}
              height={250}
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
