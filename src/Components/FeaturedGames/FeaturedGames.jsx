"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./FeaturedGames.module.css";
import { fetchFeatured } from "@/utilities/fetchFeatured/fetchFeatured";

const FeaturedGames = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      const games = await fetchFeatured();
      setFeaturedGames(games);
      setActiveGame(games[0] || {});
      setIsLoading(false);
    };

    loadGames();
  }, []);

  const handleImageError = (name) => {
    console.error(`Failed to load logo for: ${name}`);
  };

  const { main_images, name, desc } = activeGame || {};
  const logo = main_images?.logo || "";
  const backgroundImage = main_images?.thumbnail || "";

  return (
    <div className={styles.carousel_container}>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={`${styles.big_box} ${styles.loadingEffect}`}>
            <div className={styles.shimmer}></div>
          </div>
          <div className={styles.thumbnailLoadingContainer}>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`${styles.thumbnail} ${styles.loadingEffect}`}
              >
                <div className={styles.shimmer}></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div
            className={styles.big_box}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className={styles.big_box_inner}>
              {logo ? (
                <Image
                  src={logo}
                  alt={`${name} Logo`}
                  width={400}
                  height={200}
                  onError={() => handleImageError(name)}
                />
              ) : (
                <div>No logo available</div>
              )}
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
                  activeGame?.id === game.id ? styles.active : ""
                }`}
                onClick={() => setActiveGame(game)}
                style={{
                  backgroundImage: `url(${game.main_images?.thumbnail || ""})`,
                }}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedGames;
