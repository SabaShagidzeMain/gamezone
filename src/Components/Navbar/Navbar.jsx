"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

import { FaArrowDown } from "react-icons/fa";
import {
  SiOculus,
  SiPlaystation5,
  SiPlaystation4,
  SiXbox,
  SiNintendoswitch,
} from "react-icons/si";
import { PiGameControllerLight } from "react-icons/pi";
import { GiConsoleController } from "react-icons/gi";

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
        <ul className={styles.dropdown_list}>
          <li className={`${styles.list_item} ${styles.dropdown_list_item}`}>
            <Link href="/consoles/ps5">
              <SiPlaystation5 className={styles.dropdown_logo} />
            </Link>
          </li>
          <li className={`${styles.list_item} ${styles.dropdown_list_item}`}>
            <Link href="/consoles/ps4">
              <SiPlaystation4 className={styles.dropdown_logo} />
            </Link>
          </li>
          <li className={`${styles.list_item} ${styles.dropdown_list_item}`}>
            <Link href="/consoles/xbox">
              <SiXbox className={styles.dropdown_logo} />
            </Link>
          </li>
          <li className={`${styles.list_item} ${styles.dropdown_list_item}`}>
            <Link href="/consoles/nintendo">
              <SiNintendoswitch className={styles.dropdown_logo} />
            </Link>
          </li>
        </ul>
      </div>
      <div
        className={`${styles.dropdownMenu} ${
          activeDropdown === "games" ? styles.show : ""
        }`}
      >
        <ul>
          <li className={`${styles.list_item} ${styles.dropdown_list_item}`}>
            <PiGameControllerLight className={styles.dropdown_logo} />
            <Link href="/games/adventure">Ps5 თამშები</Link>
          </li>
          <li className={`${styles.list_item} ${styles.dropdown_list_item}`}>
            <GiConsoleController className={styles.dropdown_logo} />
            <Link href="/games/adventure">Ps4 თამაშები</Link>
          </li>
          <li className={`${styles.list_item} ${styles.dropdown_list_item}`}>
            <SiNintendoswitch className={styles.dropdown_logo} />
            <Link href="/games/sports">Nintendo თამაშები</Link>
          </li>
          <li className={`${styles.list_item} ${styles.dropdown_list_item}`}>
            <SiOculus className={styles.dropdown_logo} />
            <Link href="/games/sports">VR თამაშები</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
