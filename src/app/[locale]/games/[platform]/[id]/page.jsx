"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utilities/supabase/supabase";
import Navbar from "@/Components/Navbar/Navbar";
import styles from "./gamedetail.module.css";
import Image from "next/image";
import GameImageGallery from "@/Components/GameImageGallery/GameImageGallery";
import GameSpinner from "@/Components/GameSwiper/GameSwiper";
import Footer from "@/Components/Footer/Footer";
import handlePurchase from "@/utilities/handlePurchase/handlePurchase";

const GameDetails = ({ params }) => {
  const { id, platform } = params;
  const [game, setGame] = useState(null);
  const [locale, setLocale] = useState(""); // State to hold locale

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const { data, error } = await supabase
          .from("games_admin")
          .select("*")
          .eq("id", id)
          .single();
        if (error) {
          throw error;
        }
        setGame(data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    // Extract locale from pathname
    const pathSegments = window.location.pathname.split("/");
    const localeFromUrl = pathSegments[1]; // Assuming locale is at index 1
    setLocale(localeFromUrl); // Set locale state

    fetchGame();
  }, [id, platform]);

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />

      <div className={styles.game_detail}>
        <div
          className={styles.game_thumbnail}
          style={{ backgroundImage: `url(${game.additional_images.add1})` }}
        >
          <Image
            src={`${game.main_images.logo}`}
            width={800}
            height={350}
            alt="Logo"
          />
        </div>
        <div className={styles.game_wrapper}>
          <div className={styles.game_top_inner}>
            <div className={styles.game_gallery}>
              <GameImageGallery
                thumbnail={game.main_images.thumbnail}
                additionalImages={
                  game.additional_images
                    ? Object.values(game.additional_images)
                    : []
                }
              />
            </div>
            <div className={styles.game_detail_info}>
              <div
                className={styles.game_detail_pic}
                style={{ backgroundImage: `url(${game.main_images.disc})` }}
              ></div>
              <h1>{game.name}</h1>
              <h3>${game.price / 100}</h3>
              <div className={styles.game_detail_text}>
                <p>Genre: {game.genre}</p>
                <p>Rating: {game.rating}</p>
                <p>Release Date: {game.release_date}</p>
              </div>
              <div className={styles.button_container}>
                <button
                  onClick={
                    () => handlePurchase(game.stripe_price_id, locale) // Pass locale to handlePurchase
                  }
                >
                  Buy Now
                </button>
                <button>Add To Cart</button>
              </div>
            </div>
          </div>
          <div className={styles.game_desc}>
            <p>{game.desc}</p>
          </div>
          <div className={styles.game_detail_vid_container}>
            <iframe
              width="560"
              height="315"
              src={game.video}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className={styles.game_detail_vid}
            ></iframe>
          </div>
        </div>
        <div className={styles.spinner_wrapper}>
          <h3>Discover More Games</h3>
          <GameSpinner />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default GameDetails;
