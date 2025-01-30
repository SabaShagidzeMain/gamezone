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
          .contains("tags_array", ["Featured"]); // Fixed: Ensure we're filtering based on tags_array

        if (error) throw error;

        console.log("Fetched data:", data); // Debugging fetched data

        // Ensure the fetched data is as expected
        setFeaturedGames(data);
        setActiveGame(data[0] || {}); // Set the first game if available
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

  const { main_images, name, desc } = activeGame || {};
  const logo = main_images?.logo || ""; // Access logo from main_images
  const backgroundImage = main_images?.thumbnail || ""; // Access thumbnail from main_images
  const discImage = main_images?.disc || ""; // Access disc from main_images

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
                <div>No logo available</div> // Display a fallback message if logo is missing
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
