// components/Navbar.js
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <h2>GameZone</h2>
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <div
            onClick={() => toggleDropdown("consoles")}
            className={styles.dropdownToggle}
          >
            Consoles
          </div>
        </li>
        <li>
          <div
            onClick={() => toggleDropdown("games")}
            className={styles.dropdownToggle}
          >
            Games
          </div>
        </li>
        <li>
          <Link href="/pc-products">PC Products</Link>
        </li>
        <li>
          <Link href="/about">About Us</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
      <div
        className={`${styles.dropdownMenu} ${
          activeDropdown === "consoles" ? styles.show : ""
        }`}
      >
        <ul>
          <li>
            <Link href="/consoles/ps5">PS5</Link>
          </li>
          <li>
            <Link href="/consoles/xbox">Xbox</Link>
          </li>
          <li>
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
          <li>
            <Link href="/games/action">Action</Link>
          </li>
          <li>
            <Link href="/games/adventure">Adventure</Link>
          </li>
          <li>
            <Link href="/games/sports">Sports</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
