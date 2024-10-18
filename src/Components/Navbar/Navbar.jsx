"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

import { FaArrowDown } from "react-icons/fa";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_left}>
        <div className={styles.logo}>
          <Link href="/">
            <h2>GameZone</h2>
          </Link>
        </div>
        <ul className={styles.navLinks}>
          <li className={styles.list_item}>
            <div
              onClick={() => toggleDropdown("consoles")}
              className={styles.dropdownToggle}
            >
              <button className={styles.nav_link}>კონსოლები</button>
              <FaArrowDown
                className={`${styles.dropdownToggle_icon} ${
                  activeDropdown === "consoles" ? styles.rotated : ""
                }`}
              />
            </div>
          </li>
          <li className={styles.list_item}>
            <div
              onClick={() => toggleDropdown("games")}
              className={styles.dropdownToggle}
            >
              <button className={styles.nav_link}>თამაშები</button>
              <FaArrowDown
                className={`${styles.dropdownToggle_icon} ${
                  activeDropdown === "games" ? styles.rotated : ""
                }`}
              />
            </div>
          </li>
          <li className={styles.list_item}>
            <button className={styles.nav_link}>აქსესუარები</button>
          </li>
          <li className={styles.list_item}>
            <button className={styles.nav_link}>ჩვენს შესახებ</button>
          </li>
          <li className={styles.list_item}>
            <button className={styles.nav_link}>კონტაქტი</button>
          </li>
        </ul>
      </div>
      <div className={styles.navbar_right}>
        <button className={styles.navbar_button}>პროფილი</button>
      </div>
      <div
        className={`${styles.dropdownMenu} ${
          activeDropdown === "consoles" ? styles.show : ""
        }`}
      >
        <ul>
          <li className={styles.list_item}>
            <Link href="/consoles/ps5">PS5</Link>
          </li>
          <li className={styles.list_item}>
            <Link href="/consoles/xbox">Xbox</Link>
          </li>
          <li className={styles.list_item}>
            <Link href="/consoles/nintendo">Nintendo</Link>
          </li>
        </ul>
      </div>
      <div
        className={`${styles.dropdownMenu} ${
          activeDropdown === "games" ? styles.show : ""
        }`}
      >
        <ul>
          <li className={styles.list_item}>
            <Link href="/games/action">Action</Link>
          </li>
          <li className={styles.list_item}>
            <Link href="/games/adventure">Adventure</Link>
          </li>
          <li className={styles.list_item}>
            <Link href="/games/sports">Sports</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
