"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./FeaturedGames.module.css";
import { supabase } from "@/utilities/supabase/supabase";

const FeaturedGames = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [featuredGames, setFeaturedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data, error } = await supabase
          .from("games_admin")
          .select("*")
          .contains("tags", ["Featured"]);

        if (error) throw error;

        // Set the fetched games into state
        setFeaturedGames(data);
        setActiveGame(data[0]); // Set the first game as active (or modify as per your logic)
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleImageError = (name) => {
    console.error(`Failed to load logo for: ${name}`);
  };

  const { logo, name, desc, additionalImages } = activeGame || {};
  const backgroundImage =
    additionalImages && additionalImages.length > 0 ? additionalImages[0] : "";

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
                  activeGame?.id === game.id ? styles.active : ""
                }`}
                onClick={() => setActiveGame(game)}
                style={{ backgroundImage: `url(${game.thumbnail})` }}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedGames;
