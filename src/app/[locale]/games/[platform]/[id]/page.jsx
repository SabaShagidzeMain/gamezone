"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/Components/Navbar/Navbar";
import styles from "./gamedetail.module.css";
import Image from "next/image";
import GameImageGallery from "@/Components/GameImageGallery/GameImageGallery";

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
            height={350}
            alt="Logo"
          ></Image>
        </div>
        <div className={styles.game_wrapper}>
          <div className={styles.game_top_inner}>
            <div className={styles.game_gallery}>
              <GameImageGallery
                thumbnail={game.thumbnail}
                additionalImages={game.additionalImages}
              />
            </div>
            <div className={styles.game_detail_info}>
              <div
                className={styles.game_detail_pic}
                style={{ backgroundImage: `url(${game.disc})` }}
              ></div>
              <h1>{game.name}</h1>
              <h3>${game.price}</h3>
              <div className={styles.button_container}>
                <button>Buy Now</button>
                <button>Add To Cart</button>
              </div>
              <div className={styles.game_detail_text}>
                <p>Genre: {game.genre}</p>
                <p>Rating: {game.rating}</p>
                <p>Release Date: {game.releaseDate}</p>
                <p>Difficulty: {game.difficulty}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default GameDetails;
