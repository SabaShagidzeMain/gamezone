"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./FeaturedGames.module.css";
import axios from "axios";

const FeaturedGames = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [featuredGames, setFeaturedGames] = useState([]);

  useEffect(() => {
    const fetchFeaturedGames = async () => {
      try {
        const response = await axios.get("/api/games");
        const featured = response.data.filter((game) => game.featured);
        setFeaturedGames(featured);
        setActiveGame(featured[0]);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchFeaturedGames();
  }, []);

  if (!activeGame) return <div>Loading...</div>;

  const { logo, name, desc, additionalImages } = activeGame;

  const backgroundImage =
    additionalImages.length > 0 ? additionalImages[0] : "";

  const handleImageError = (name) => {
    console.error(`Failed to load logo for: ${name}`);
  };

  return (
    <div className={styles.carousel_container}>
      <div
        className={styles.big_box}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className={styles.big_box_inner}>
          <Image
            src={logo}
            alt={`${name} Logo`}
            width={400}
            height={200}
            onError={() => handleImageError(name)}
          />
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.desc}>{desc}</p>
          <button className={styles.button}>გაიგე მეტი</button>
        </div>
      </div>
      <div className={styles.thumbnails}>
        {featuredGames.map((game) => (
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
