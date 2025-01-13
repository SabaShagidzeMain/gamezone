import React from "react";

import Image from "next/image";
import handleSub from "@/utilities/handleSub/handleSub";

import styles from "./subinfo.module.css";

const SubInfo = () => {
  return (
    <>
      <div className={styles.sub_info}>
        <div className={styles.info_card}>
          <div className={styles.info_left}>
            <Image
              src={"/images/sub/sub1.png"}
              width={200}
              height={200}
              quality={100}
              alt="info"
            />
          </div>
          <div className={styles.info_right}>
            <p className={styles.info_header}>Essential Membership</p>
            <p className={styles.info_cost}>Cost: $10.00 / Month</p>
            <div className={styles.info_list_wrapper}>
              <ul className={styles.info_list}>
                <li className={styles.info_item}>
                  Early access to sales and discounts
                </li>
                <li className={styles.info_item}>
                  Monthly newsletter with gaming and tech updates
                </li>
                <li className={styles.info_item}>
                  Occasional free or discounted digital games/software downloads
                </li>
                <li className={styles.info_item}>
                  Members-only online events or Q&A sessions
                </li>
              </ul>
            </div>
            <p className={styles.info_text}>
              Ideal for: Casual gamers and tech enthusiasts looking for
              exclusive perks without a big commitment.
            </p>
            <button
              onClick={() => handleSub("essential")}
              className={styles.info_button}
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className={styles.info_card} id={styles.info_reverse}>
          <div className={styles.info_left}>
            <Image
              src={"/images/sub/sub2.png"}
              width={200}
              height={200}
              quality={100}
              alt="info"
            />
          </div>
          <div className={styles.info_right} id={styles.info_right_reverse}>
            <p className={styles.info_header}>Extra Membership</p>
            <p className={styles.info_cost}>Cost: $20.00 / Month</p>
            <div className={styles.info_list_wrapper}>
              <ul className={styles.info_list}>
                <li className={styles.info_item}>
                  One free monthly game download (from a curated list)
                </li>
                <li className={styles.info_item}>
                  10–20% discounts on games, tech hardware, and accessories
                </li>
                <li className={styles.info_item}>
                  Exclusive in-game items or DLCs
                </li>
                <li className={styles.info_item}>
                  Priority access to pre-orders and limited-stock items
                </li>
                <li className={styles.info_item}>
                  Extended warranty for gaming gear
                </li>
                <li className={styles.info_item}>
                  Participation in beta testing for new games and tech
                </li>
              </ul>
            </div>
            <p className={styles.info_text}>
              Ideal For: Dedicated gamers who want exclusive discounts, free
              games, and early access perks.
            </p>
            <button
              onClick={() => handleSub("extra")}
              className={styles.info_button}
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className={styles.info_card}>
          <div className={styles.info_left}>
            <Image
              src={"/images/sub/sub3.png"}
              width={200}
              height={200}
              quality={100}
              alt="info"
            />
          </div>
          <div className={styles.info_right}>
            <p className={styles.info_header}>Premium Membership</p>
            <p className={styles.info_cost}>Cost: $30.00 / Month</p>
            <div className={styles.info_list_wrapper}>
              <ul className={styles.info_list}>
                <li className={styles.info_item}>
                  Includes all Premium Gamer features
                </li>
                <li className={styles.info_item}>
                  Access to a cloud gaming service or game library
                </li>
                <li className={styles.info_item}>
                  25% discount on high-end tech products{" "}
                </li>
                <li className={styles.info_item}>
                  Free shipping on all orders
                </li>
                <li className={styles.info_item}>
                  Personalized tech and gaming consultations
                </li>
                <li className={styles.info_item}>
                  Invitations to VIP events, gaming tournaments, or private tech
                  previews
                </li>
              </ul>
            </div>
            <p className={styles.info_text}>
              Ideal For: Tech-savvy gamers and enthusiasts who want top-tier
              discounts, premium features, and personalized support.
            </p>
            <button
              onClick={() => handleSub("premium")}
              className={styles.info_button}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubInfo;
