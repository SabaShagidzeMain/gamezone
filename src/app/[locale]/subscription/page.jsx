"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { loadStripe } from "@stripe/stripe-js";

import styles from "./subscription.module.css";

import Navbar from "@/Components/Navbar/Navbar";

const SubPage = () => {
  const router = useRouter(); // Initialize the router for redirection

  const handleSubscription = async (plan) => {
    try {
      // Get the userId (this could be fetched from your session or Auth0)
      const userId = "user123"; // Example user ID, replace with the actual logic

      const response = await fetch("/api/create-subscription-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan, userId }), // Pass userId along with plan
      });

      const session = await response.json();

      if (session.id) {
        const stripe = await loadStripe(
          "pk_test_51QYsp1AmxgDfPxvUVAYlxuNOlHBHmFKBhwtJz4flbwdauP9ZUIjoukjFTKOhNywRlVDbK07QUlLvVwdiGGGDUNgI00egQiMML8"
        );

        // Redirect user to Stripe Checkout for payment
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (error) {
          console.error("Stripe checkout error:", error);
        }
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  // "pk_test_51QYsp1AmxgDfPxvUVAYlxuNOlHBHmFKBhwtJz4flbwdauP9ZUIjoukjFTKOhNywRlVDbK07QUlLvVwdiGGGDUNgI00egQiMML8"

  return (
    <>
      <Navbar />
      <div className={styles.subBanner}>
        <div className={styles.bannerText}>
          <h2>აღმოაჩინეთ უამრავი ახალი სამყარო Playstation Plus-თან ერთად</h2>
          <p>
            დააგროვეთ ახალი გამოცდილებების Playstation Plus-თან ერთად, <br />
            მოიპოვეთ, ჩვენს კატალოგში თავმოყრილ, ასობით თამაშზე წვდომა.
          </p>
          <button>გაიგე მეტი</button>
        </div>
      </div>
      <div className={styles.membershipPlans}>
        <h2>აირჩიეთ თქვენი გეგმა</h2>
        <p>
          აღმოაჩინეთ თქვენი შემდეგი თავგადასავალი ასობით თამაშისგან შემდგარი
          ახალი კატალოგებით, ონლაინ მულტიპლეიერით, ექსკლუზიური ფასდაკლებებითა და
          სხვა უამრავი შესაძლებლობით.
        </p>
        <div className={styles.membershipCards}>
          <div className={styles.membershipCard}>
            <div className={styles.cardHeader}>
              <h3>ESSENTIAL</h3>
              <p>Monthly Games, Online Multiplayer And More</p>
            </div>
            <div className={styles.cardContent}>
              <ul className={styles.cardList}>
                <li>Monthly Games</li>
                <li>Online Multiplayer</li>
                <li>Exclusive Discounts</li>
                <li>Exclusive Content</li>
                <li>Cloud Storage</li>
                <li>Share Play</li>
              </ul>
            </div>
            <div className={styles.cardButton}>
              <button onClick={() => handleSubscription("essential")}>
                Subscribe
              </button>
            </div>
          </div>
          <div className={styles.membershipCard}>
            <div className={styles.cardHeader}>
              <h3>EXTRA</h3>
              <p>Discover Hundreds Of Games</p>
            </div>
            <div className={styles.cardContent}>
              <ul className={styles.cardList}>
                <li>Monthly Games</li>
                <li>Online Multiplayer</li>
                <li>Exclusive Discounts</li>
                <li>Exclusive Content</li>
                <li>Cloud Storage</li>
                <li>Share Play</li>
                <li>Game Catalog</li>
                <li>Ubisoft+ Classics</li>
              </ul>
            </div>
            <div className={styles.cardButton}>
              <button onClick={() => handleSubscription("extra")}>
                Subscribe
              </button>
            </div>
          </div>
          <div className={styles.membershipCard}>
            <div className={styles.cardHeader}>
              <h3>PREMIUM</h3>
              <p>Experience All The Benefits</p>
            </div>
            <div className={styles.cardContent}>
              <ul className={styles.cardList}>
                <li>Monthly Games</li>
                <li>Online Multiplayer</li>
                <li>Exclusive Discounts</li>
                <li>Exclusive Content</li>
                <li>Cloud Storage</li>
                <li>Share Play</li>
                <li>Game Catalog</li>
                <li>Ubisoft+ Classics</li>
              </ul>
            </div>
            <div className={styles.cardButton}>
              <button onClick={() => handleSubscription("premium")}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubPage;
