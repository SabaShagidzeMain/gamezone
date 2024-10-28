"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./GameShowcase.module.css";

const GameShowcase = () => {
  const [games, setGames] = useState([]);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true); // Set loading to true while fetching
        const response = await axios.get("/api/games");
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchGames();
  }, []);

  const handleNewReleasesClick = () => {
    setShowComingSoon(false);
  };

  const handleComingSoonClick = () => {
    setShowComingSoon(true);
  };

  const displayedGames = showComingSoon
    ? games.filter((game) => game.coming)
    : games.filter((game) => game.new);

  return (
    <div className={styles.game_showcase_section}>
      <div className={styles.button_container}>
        <button
          className={
            showComingSoon ? styles.inactiveButton : styles.activeButton
          }
          onClick={handleNewReleasesClick}
        >
          New Releases
        </button>
        <button
          className={
            showComingSoon ? styles.activeButton : styles.inactiveButton
          }
          onClick={handleComingSoonClick}
        >
          Coming Soon
        </button>
      </div>
      <div className={styles.game_cards}>
        {loading
          ? Array.from({ length: displayedGames.length || 6 }).map(
              (_, index) => (
                <div key={index} className={styles.loading_game_card}>
                  <div className={styles.loading_game_card_image}>
                    <div className={styles.shimmer}></div>
                  </div>
                  <div className={styles.loading_game_title}>
                    <div className={styles.shimmer}></div>
                  </div>
                </div>
              )
            )
          : displayedGames.map((game) => (
              <div
                key={game.id}
                className={`${styles.game_card} ${
                  hoveredCardId && hoveredCardId !== game.id
                    ? styles.dimmed
                    : ""
                }`}
                onMouseEnter={() => setHoveredCardId(game.id)}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <div
                  className={styles.game_card_image}
                  style={{ backgroundImage: `url(${game.thumbnail})` }}
                ></div>
                <h3 className={styles.game_title}>{game.name}</h3>
              </div>
            ))}
      </div>
    </div>
  );
};

export default GameShowcase;
