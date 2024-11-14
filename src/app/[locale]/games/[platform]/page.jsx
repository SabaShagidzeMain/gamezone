"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/Components/Navbar/Navbar";
import styles from "./games.module.css";
import Image from "next/image";

const PlatformPage = () => {
  const pathname = usePathname();
  const platform = pathname.split("/").pop(); // Extract platform from URL
  const [games, setGames] = useState([]); // State to store games

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("/api/games");
        const allGames = response.data;

        // Filter games based on platform
        const filteredGames = allGames.filter((game) =>
          game.platform.toLowerCase().includes(platform.toLowerCase())
        );

        // If no games match, show all games
        setGames(filteredGames.length > 0 ? filteredGames : allGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [platform]);

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
      <div className={styles.games_list}>
        {games.map((game) => (
          <div key={game.id} className={styles.game_card}>
            <Image src={game.disc} alt={game.name} width={180} height={250}/>
            <h2>{game.name}</h2>
            <p>{game.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformPage;
