import React from "react";
import styles from "./Profile.module.css";

import { FaRegUserCircle } from "react-icons/fa";

const Profile = ({ userData, logOut }) => {
  const planAssets = {
    basic: {
      background: "/images/planBanners/plan-basic.jpg",
    },
    essential: {
      icon: "/images/sub/sub1.png",
      background: "/images/planBanners/plan-essential.jpg",
    },
    extra: {
      icon: "/images/sub/sub2.png",
      background: "/images/planBanners/plan-extra.avif",
    },
    premium: {
      icon: "/images/sub/sub3.png",
      background: "/images/planBanners/plan-premium.jpg",
    },
  };

  const currentPlan = planAssets[userData?.plan] || planAssets.basic;

  const backgroundStyle = {
    backgroundImage: `url(${currentPlan.background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  return (
    <div className={styles.profile_box}>
      <div className={styles.profile_info}>
        <div style={backgroundStyle} className={styles.profile_banner}></div>
        <div className={styles.profile_image}>
          <FaRegUserCircle className={styles.profile_icon} />
        </div>
        <p>Hello!</p>
        <p>@{userData?.username || "Loading..."}</p>
        <p>
          <strong>Email:</strong> {userData?.email || "Loading..."}
        </p>
        <p>
          <strong>Subscription Plan:</strong> {userData?.plan || "Basic"}
        </p>
        <button className={styles.profile_button} onClick={logOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
