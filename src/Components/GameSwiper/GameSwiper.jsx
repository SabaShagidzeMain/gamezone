import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import styles from "./GameSwiper.module.css";
import { Pagination, Autoplay } from "swiper/modules";

const GameSpinner = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("/api/games");
        setGames(response.data); // Assuming response.data is an array of games
        setLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return <div className={styles.spinner}>Loading...</div>;
  }

  return (
    <div className={styles.gameSpinnerContainer}>
      <Swiper
        spaceBetween={5}
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        navigation={false}
        modules={[Pagination, Autoplay]}
        className={styles.swiper}
      >
        {games.slice(23, 34).map(
          (
            game // Limit to 9 games
          ) => (
            <SwiperSlide key={game.id} className={styles.swiperSlide}>
              <div className={styles.gameCard}>
                <img
                  src={game.thumbnail}
                  alt={game.name}
                  className={styles.thumbnail}
                />
                <h3 className={styles.gameName}>{game.name}</h3>
                <p className={styles.gameGenre}>{game.genre}</p>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default GameSpinner;
