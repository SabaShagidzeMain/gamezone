"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/Components/Navbar/Navbar";
import styles from "./gamedetail.module.css";
import Image from "next/image";

import Footer from "@/Components/Footer/Footer";

const GameDetails = ({ params }) => {
  const { id } = params;
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get("/api/games");
        const allGames = response.data;
        const selectedGame = allGames.find((game) => game.id === parseInt(id));
        setGame(selectedGame);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />

      <div className={styles.game_detail}>
        <div
          className={styles.game_thumbnail}
          style={{ backgroundImage: `url(${game.additionalImages[0]})` }}
        >
          <Image
            src={`${game.logo}`}
            width={800}
            height={300}
            alt="Logo"
          ></Image>
        </div>
        <div className={styles.game_wrapper}>
          <div
            className={styles.game_detail_pic}
            style={{ backgroundImage: `url(${game.disc})` }}
          ></div>
          <div className={styles.game_detail_info}>
            <h1>{game.name}</h1>
            <p>Genre: {game.genre}</p>
            <p>Rating: {game.rating}</p>
            <p>Release Date: {game.releaseDate}</p>
            <p>Difficulty: {game.difficulty}</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default GameDetails;
