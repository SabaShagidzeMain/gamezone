"use client";

import React from "react";
import { useState } from "react";
import styles from "./FeaturedProducts.module.css";

const featuredGames = [
  {
    id: 1,
    title: "Warhammer: Space Marine 2",
    background: "/images/featured/background/bck-space-marine.jpeg",
    thumbnail: "/images/featured/thumbnail/thmb-space-marine.jpeg",
    desc: "Warhammer 40,000: Space Marine 2 on Steam. Embody the superhuman skill and brutality of a Space Marine. Unleash deadly abilities and devastating weaponry to obliterate the relentless Tyranid swarms. Defend the Imperium in spectacular third-person action in solo or multiplayer modes.",
  },
  {
    id: 2,
    title: "Black Myth: Wu-kong",
    background: "/images/featured/background/bck-wukong.jpg",
    thumbnail: "/images/featured/thumbnail/thmb-wukong.jpg",
    desc: "Warhammer 40,000: Space Marine 2 on Steam. Embody the superhuman skill and brutality of a Space Marine. Unleash deadly abilities and devastating weaponry to obliterate the relentless Tyranid swarms. Defend the Imperium in spectacular third-person action in solo or multiplayer modes.",
  },
  {
    id: 3,
    title: "Warhammer: Space Marine 2",
    background: "/images/featured/background/bck-space-marine.jpeg",
    thumbnail: "/images/featured/thumbnail/thmb-space-marine.jpeg",
    desc: "Warhammer 40,000: Space Marine 2 on Steam. Embody the superhuman skill and brutality of a Space Marine. Unleash deadly abilities and devastating weaponry to obliterate the relentless Tyranid swarms. Defend the Imperium in spectacular third-person action in solo or multiplayer modes.",
  },
  {
    id: 4,
    title: "Warhammer: Space Marine 2",
    background: "/images/featured/background/bck-wukong.jpg",
    thumbnail: "/images/featured/thumbnail/thmb-wukong.jpg",
    desc: "Warhammer 40,000: Space Marine 2 on Steam. Embody the superhuman skill and brutality of a Space Marine. Unleash deadly abilities and devastating weaponry to obliterate the relentless Tyranid swarms. Defend the Imperium in spectacular third-person action in solo or multiplayer modes.",
  },
  {
    id: 5,
    title: "Warhammer: Space Marine 2",
    background: "/images/featured/background/bck-space-marine.jpeg",
    thumbnail: "/images/featured/thumbnail/thmb-space-marine.jpeg",
    desc: "Warhammer 40,000: Space Marine 2 on Steam. Embody the superhuman skill and brutality of a Space Marine. Unleash deadly abilities and devastating weaponry to obliterate the relentless Tyranid swarms. Defend the Imperium in spectacular third-person action in solo or multiplayer modes.",
  },
  {
    id: 6,
    title: "Warhammer: Space Marine 2",
    background: "/images/featured/background/bck-wukong.jpg",
    thumbnail: "/images/featured/thumbnail/thmb-wukong.jpg",
    desc: "Warhammer 40,000: Space Marine 2 on Steam. Embody the superhuman skill and brutality of a Space Marine. Unleash deadly abilities and devastating weaponry to obliterate the relentless Tyranid swarms. Defend the Imperium in spectacular third-person action in solo or multiplayer modes.",
  },
];

const FeaturedPoducts = () => {
  const [activeGame, setActiveGame] = useState(featuredGames[0]);

  return (
    <>
      <div className={styles.carousel_container}>
        <div
          className={styles.big_box}
          style={{ backgroundImage: `url(${activeGame.background})` }}
        >
          <h2>{activeGame.title}</h2>
          {/* <p>{activeGame.desc}</p> */}
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
    </>
  );
};

export default FeaturedPoducts;
