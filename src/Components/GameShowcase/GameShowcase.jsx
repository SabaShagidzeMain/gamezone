"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./GameShowcase.module.css";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const GameShowcase = () => {
  const [games, setGames] = useState([]);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showNew, setShowNew] = useState(true);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [loading, setLoading] = useState(true);

  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        let response;

        if (showComingSoon) {
          response = await axios.get("/api/games?showComingSoon=true");
        } else if (showNew) {
          response = await axios.get("/api/games?showNew=true");
        } else {
          response = await axios.get("/api/games");
        }

        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [showComingSoon, showNew]);

  const handleNewReleasesClick = () => {
    setShowComingSoon(false);
    setShowNew(true);
  };

  const handleComingSoonClick = () => {
    setShowNew(false);
    setShowComingSoon(true);
  };

  return (
    <div className={styles.game_showcase_section}>
      <div className={styles.button_container}>
        <button
          className={showNew ? styles.activeButton : styles.inactiveButton}
          onClick={handleNewReleasesClick}
        >
          {t("game-showcase.new")}
        </button>
        <button
          className={
            showComingSoon ? styles.activeButton : styles.inactiveButton
          }
          onClick={handleComingSoonClick}
        >
          {t("game-showcase.coming")}
        </button>
      </div>
      <div className={styles.game_cards}>
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className={styles.loading_game_card}>
                <div className={styles.loading_game_card_image}>
                  <div className={styles.shimmer}></div>
                </div>
                <div className={styles.loading_game_title}>
                  <div className={styles.shimmer}></div>
                </div>
              </div>
            ))
          : games.map((game) => (
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
