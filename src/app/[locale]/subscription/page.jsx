"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./subscription.module.css";
import Navbar from "@/Components/Navbar/Navbar";

import { FaRegHandshake } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbMessage2Share } from "react-icons/tb";
import { GoUnlock } from "react-icons/go";

import Image from "next/image";

import SubscriptionCards from "@/Components/SubscriptionCards/SubscriptionCards";
import SubInfo from "@/Components/SubInfo/SubInfo";

const SubPage = () => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className={styles.subBanner}></div>
      <div className={styles.subExpl}>
        <div className={styles.bannerText}>
          <h2 className={styles.main_header}>
            Unlock Exclusive Benefits with Our Membership Subscriptions!
          </h2>
          <p className={styles.main_paragraph}>
            Join our community and get access to exclusive discounts, free
            games, early releases, and more. Whether you`re a casual gamer or a
            tech enthusiast, we have a subscription tailored to suit your needs.{" "}
            <br />
            From monthly game downloads to personalized consultations and VIP
            events, our tiers offer something special for everyone. Choose the
            plan that fits you and elevate your gaming and tech experience
            today!
          </p>
        </div>
      </div>
      <SubscriptionCards />
      <div className={styles.sub_points}>
        <h2 className={styles.points_header}>
          Join the #1 Gaming & Tech Subscription Service Today And Unlock
          Exclusive Perks
        </h2>
        <div className={styles.point_wrapper}>
          <div className={styles.point_card}>
            <div className={styles.point_icon}>
              <FaRegHandshake />
            </div>
            <p className={styles.point_header}>
              Thousands Of Happy Gamers Served
            </p>
            <p className={styles.point_paragraph}>
              We`ve delivered over 10,000 subscription packs filled with games,
              discounts and exclusive persk to passionate gamers nationwide .
            </p>
          </div>
          <div className={styles.point_card}>
            <div className={styles.point_icon}>
              <IoMdCheckmarkCircleOutline />
            </div>
            <p className={styles.point_header}>Always Fresh Content</p>
            <p className={styles.point_paragraph}>
              With our subscriptions, you’ll discover new games, exclusive
              deals, and innovative tech every month—no repeats, just fresh,
              exciting experiences tailored for you.
            </p>
          </div>
        </div>
        <div className={styles.point_wrapper}>
          <div className={styles.point_card}>
            <div className={styles.point_icon}>
              <TbMessage2Share />
            </div>
            <p className={styles.point_header}>Exclusive Community Access</p>
            <p className={styles.point_paragraph}>
              Be part of a thriving community of like-minded gamers and tech
              lovers. Share your experiences, join events, and connect with
              others who share your passion for gaming.
            </p>
          </div>
          <div className={styles.point_card}>
            <div className={styles.point_icon}>
              <GoUnlock />
            </div>
            <p className={styles.point_header}>No Lock-In Contracts</p>
            <p className={styles.point_paragraph}>
              Enjoy the freedom of Pay-By-The-Month with no strings attached.
              You can cancel or pause your subscription anytime, giving you
              complete control over your membership.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.learn_header}>
        <span className={styles.sub_span} />
        <h3>Learn More</h3>
        <span className={styles.sub_span} />
      </div>
      <SubInfo />
    </>
  );
};

export default SubPage;
