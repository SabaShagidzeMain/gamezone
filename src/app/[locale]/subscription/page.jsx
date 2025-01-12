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
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      if (!userId) {
        console.error("User not authenticated");
        return;
      }

      const response = await fetch("/api/create-subscription-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, plan }), // Pass userId and plan to the server
      });

      if (!response.ok) {
        console.error("Failed to create subscription session");
        return;
      }

      const { id: sessionId } = await response.json();

      // Use Stripe.js to redirect to the checkout page
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
      );
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Error redirecting to checkout:", error.message);
      }
    } catch (error) {
      console.error("Error in subscription request:", error);
    }
  };

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
