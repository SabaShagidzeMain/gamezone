"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./FeaturedGames.module.css";
import featuredGamesArr from "@/utilities/featuredGames/featuredGamesArr";

const FeaturedGames = () => {
  const [activeGame, setActiveGame] = useState(featuredGamesArr[0]);

  const { logo, title, desc, background } = activeGame;

  const handleImageError = (gameTitle) => {
    console.error(`Failed to load logo for: ${gameTitle}`);
  };

  return (
    <div className={styles.carousel_container}>
      <div
        className={styles.big_box}
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className={styles.big_box_inner}>
          <Image
            src={logo}
            alt={`${title} Logo`}
            width={400}
            height={200}
            onError={() => handleImageError(title)}
          />
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.desc}>{desc}</p>
          <button className={styles.button}>გაიგე მეტი</button>
        </div>
      </div>
      <div className={styles.thumbnails}>
        {featuredGamesArr.map((game) => (
          <div
            key={game.id}
            className={`${styles.thumbnail} ${
              activeGame.id === game.id ? styles.active : ""
            }`}
            onClick={() => setActiveGame(game)}
            style={{ backgroundImage: `url(${game.thumbnail})` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedGames;
