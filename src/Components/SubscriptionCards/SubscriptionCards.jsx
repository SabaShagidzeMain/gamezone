import React from "react";
import styles from "./subcards.module.css";

import handleSub from "@/utilities/handleSub/handleSub";
import Image from "next/image";

const SubscriptionCards = () => {
  return (
    <div className={styles.subcard_wrapper}>
      <div className={styles.subcard}>
        <h2 className={styles.subcard_header}>
          ESSENTIAL <br /> <span>Membership</span>
        </h2>
        <Image
          className={styles.subcard_image}
          src="/images/sub/sub1.png"
          alt="essential"
          width={180}
          height={180}
          quality={100}
        />
        <p className={styles.subcard_price}>$10.00 / Month</p>
        <p className={styles.subcard_feat}>Features:</p>
        <ul className={styles.subcard_list}>
          <li className={styles.subcard_item}>
            Early access to discounts and sales
          </li>
          <li className={styles.subcard_item}>
            Monthly gaming and tech newsletter
          </li>
          <li className={styles.subcard_item}>discounted digital downloads</li>
        </ul>
        <span className={styles.subcard_bar} />
        <button
          onClick={() => handleSub("essential")}
          className={styles.subcard_button}
        >
          Subscribe
        </button>
      </div>
      <div className={styles.subcard}>
        <h2 className={styles.subcard_header}>
          ESSENTIAL <br /> <span>Membership</span>
        </h2>
        <Image
          className={styles.subcard_image}
          width={180}
          height={180}
          quality={100}
          src="/images/sub/sub2.png"
          alt="essential"
        />
        <p className={styles.subcard_price}>$20.00 / Month</p>
        <p className={styles.subcard_feat}>Features:</p>
        <ul className={styles.subcard_list}>
          <li className={styles.subcard_item}>
            One free monthly game download
          </li>
          <li className={styles.subcard_item}>15% discount on games</li>
          <li className={styles.subcard_item}>
            Exclusive in-game items or DLCs
          </li>
        </ul>
        <span className={styles.subcard_bar} />
        <button
          onClick={() => handleSub("extra")}
          className={styles.subcard_button}
        >
          Subscribe
        </button>
      </div>
      <div className={styles.subcard}>
        <h2 className={styles.subcard_header}>
          ESSENTIAL <br /> <span>Membership</span>
        </h2>
        <Image
          className={styles.subcard_image}
          src="/images/sub/sub3.png"
          alt="essential"
          width={180}
          height={180}
          quality={100}
        />
        <p className={styles.subcard_price}>$30.00 / Month</p>
        <p className={styles.subcard_feat}>Features:</p>
        <ul className={styles.subcard_list}>
          <li className={styles.subcard_item}>
            Access to a cloud gaming library
          </li>
          <li className={styles.subcard_item}>25% discount on high-end tech</li>
          <li className={styles.subcard_item}>
            Personalized tech consultations
          </li>
        </ul>
        <span className={styles.subcard_bar} />
        <button
          onClick={() => handleSub("premium")}
          className={styles.subcard_button}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCards;
