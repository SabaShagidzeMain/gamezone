"use client";

import React, { useState } from "react";
import styles from "./GameShowcase.module.css"; // Import your styles

const newReleases = [
  {
    id: 1,
    title: "Game 1",
    image: "/images/gameShowcase/new/outlaws-cover.jpg",
  },
  {
    id: 2,
    title: "Game 1",
    image: "/images/gameShowcase/new/outlaws-cover.jpg",
  },
  {
    id: 3,
    title: "Game 1",
    image: "/images/gameShowcase/new/outlaws-cover.jpg",
  },
  {
    id: 4,
    title: "Game 1",
    image: "/images/gameShowcase/new/outlaws-cover.jpg",
  },
  {
    id: 5,
    title: "Game 1",
    image: "/images/gameShowcase/new/outlaws-cover.jpg",
  },
  {
    id: 6,
    title: "Game 1",
    image: "/images/gameShowcase/new/outlaws-cover.jpg",
  },
  {
    id: 7,
    title: "Game 1",
    image: "/images/gameShowcase/new/outlaws-cover.jpg",
  },
  {
    id: 8,
    title: "Game 1",
    image: "/images/gameShowcase/new/outlaws-cover.jpg",
  },
  {
    id: 9,
    title: "Game 1",
    image: "/images/gameShowcase/new/outlaws-cover.jpg",
  },
  {
    id: 10,
    title: "Game 1",
    image: "/images/gameShowcase/new/outlaws-cover.jpg",
  },
  {
    id: 11,
    title: "Game 1",
    image: "/images/gameShowcase/new/outlaws-cover.jpg",
  },
  {
    id: 12,
    title: "Game 1",
    image: "/images/gameShowcase/new/outlaws-cover.jpg",
  },
];

const comingSoon = [
  {
    id: 1,
    title: "Game 1",
    image: "/images/gameShowcase/soon/dragonage-cover.jpg",
  },
  {
    id: 2,
    title: "Game 1",
    image: "/images/gameShowcase/soon/dragonage-cover.jpg",
  },
  {
    id: 3,
    title: "Game 1",
    image: "/images/gameShowcase/soon/dragonage-cover.jpg",
  },
  {
    id: 4,
    title: "Game 1",
    image: "/images/gameShowcase/soon/dragonage-cover.jpg",
  },
  {
    id: 5,
    title: "Game 1",
    image: "/images/gameShowcase/soon/dragonage-cover.jpg",
  },
  {
    id: 6,
    title: "Game 1",
    image: "/images/gameShowcase/soon/dragonage-cover.jpg",
  },
  {
    id: 7,
    title: "Game 1",
    image: "/images/gameShowcase/soon/dragonage-cover.jpg",
  },
  {
    id: 8,
    title: "Game 1",
    image: "/images/gameShowcase/soon/dragonage-cover.jpg",
  },
  {
    id: 9,
    title: "Game 1",
    image: "/images/gameShowcase/soon/dragonage-cover.jpg",
  },
  {
    id: 10,
    title: "Game 1",
    image: "/images/gameShowcase/soon/dragonage-cover.jpg",
  },
  {
    id: 11,
    title: "Game 1",
    image: "/images/gameShowcase/soon/dragonage-cover.jpg",
  },
  {
    id: 12,
    title: "Game 1",
    image: "/images/gameShowcase/soon/dragonage-cover.jpg",
  },
];

const GameShowcase = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const handleNewReleasesClick = () => {
    setShowComingSoon(false);
  };

  const handleComingSoonClick = () => {
    setShowComingSoon(true);
  };

  const displayedGames = showComingSoon ? comingSoon : newReleases;

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
        {displayedGames.map((game) => (
          <div
            key={game.id}
            className={`${styles.game_card} ${
              hoveredCardId && hoveredCardId !== game.id ? styles.dimmed : ""
            }`}
            onMouseEnter={() => setHoveredCardId(game.id)}
            onMouseLeave={() => setHoveredCardId(null)}
          >
            <div
              className={styles.game_card_image}
              style={{ backgroundImage: `url(${game.image})` }}
            ></div>
            <h3>{game.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameShowcase;
