import React from "react";

import styles from "./subscription.module.css";

import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";

const SubPage = () => {
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
              <button>Subscribe</button>
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
              <button>Subscribe</button>
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
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SubPage;
