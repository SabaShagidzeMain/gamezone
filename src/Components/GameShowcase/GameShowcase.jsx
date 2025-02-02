"use client";

import React, { useEffect, useState } from "react";
import styles from "./GameShowcase.module.css";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { fetchShowcase } from "@/utilities/fetchShowcase/fetchShowcase";

const GameShowcase = () => {
  const [games, setGames] = useState([]);
  const [category, setCategory] = useState("New");
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [loading, setLoading] = useState(true);

  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      const data = await fetchShowcase(category);
      setGames(data);
      setLoading(false);
    };

    loadGames();
  }, [category]);

  return (
    <div className={styles.game_showcase_section}>
      <div className={styles.button_container}>
        <button
          className={
            category === "New" ? styles.activeButton : styles.inactiveButton
          }
          onClick={() => setCategory("New")}
        >
          {t("game-showcase.new")}
        </button>
        <button
          className={
            category === "Coming Soon"
              ? styles.activeButton
              : styles.inactiveButton
          }
          onClick={() => setCategory("Coming Soon")}
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
                  style={{ backgroundImage: `url(${game.main_images?.disc})` }}
                ></div>

                <h3 className={styles.game_title}>{game.name}</h3>
              </div>
            ))}
      </div>
    </div>
  );
};

export default GameShowcase;
