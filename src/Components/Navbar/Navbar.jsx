"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./navbar.module.css";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { MdDensitySmall } from "react-icons/md";
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

import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

const Navbar = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const consolesLinks = [
    {
      id: "ps5",
      href: "/consoles/ps5",
      icon: <SiPlaystation5 className={styles.dropdown_logo} />,
      label: "PS5",
    },
    {
      id: "ps4",
      href: "/consoles/ps4",
      icon: <SiPlaystation4 className={styles.dropdown_logo} />,
      label: "PS4",
    },
    {
      id: "xbox",
      href: "/consoles/xbox",
      icon: <SiXbox className={styles.dropdown_logo} />,
      label: "Xbox",
    },
    {
      id: "nintendo",
      href: "/consoles/nintendo",
      icon: <SiNintendoswitch className={styles.dropdown_logo} />,
      label: "Nintendo",
    },
  ];

  const gamesLinks = [
    {
      id: "ps5-games",
      href: "/games?console=ps5",
      icon: <PiGameControllerLight className={styles.dropdown_logo} />,
      label: `PS5 ${t("header.games")}`,
    },
    {
      id: "ps4-games",
      href: "/games?console=ps4",
      icon: <GiConsoleController className={styles.dropdown_logo} />,
      label: `PS4 ${t("header.games")}`,
    },
    {
      id: "Xbox",
      href: "/games?console=xbox",
      icon: <SiXbox className={styles.dropdown_logo} />,
      label: `XBox ${t("header.games")}`,
    },
    {
      id: "nintendo-games",
      href: "/games?console=nintendo",
      icon: <SiNintendoswitch className={styles.dropdown_logo} />,
      label: `Nintendo ${t("header.games")}`,
    },
    {
      id: "vr-games",
      href: "/games?console=vr",
      icon: <SiOculus className={styles.dropdown_logo} />,
      label: `VR ${t("header.games")}`,
    },
    {
      id: "all-games",
      href: `/${locale}/games`,
      icon: <MdDensitySmall className={styles.dropdown_logo} />,
      label: `${t("header.all-games")}`,
    },
  ];

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
              <button className={styles.nav_link}>
                {t("header.consoles")}
              </button>
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
              <button className={styles.nav_link}>{t("header.games")}</button>
              <FaArrowDown
                className={`${styles.dropdownToggle_icon} ${
                  activeDropdown === "games" ? styles.rotated : ""
                }`}
              />
            </div>
          </li>
          <li className={styles.list_item}>
            <button className={styles.nav_link}>
              {t("header.accessories")}
            </button>
          </li>
          <li className={styles.list_item}>
            <button className={styles.nav_link}>{t("header.about")}</button>
          </li>
          <li className={styles.list_item}>
            <button className={styles.nav_link}>{t("header.contact")}</button>
          </li>
        </ul>
      </div>
      <div className={styles.navbar_right}>
        <button className={styles.navbar_button}>{t("header.profile")}</button>
        <LanguageSwitcher />
      </div>

      {/* Dropdown for Consoles */}
      <div
        className={`${styles.dropdownMenu} ${
          activeDropdown === "consoles" ? styles.show : ""
        }`}
      >
        <ul className={styles.dropdown_list}>
          {consolesLinks.map((link) => (
            <li
              key={link.id}
              className={`${styles.list_item} ${styles.dropdown_list_item}`}
            >
              <Link href={link.href} className={styles.link_container}>
                <div className={styles.link_flex}>
                  {link.icon}
                  <span>{link.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Dropdown for Games */}
      <div
        className={`${styles.dropdownMenu} ${
          activeDropdown === "games" ? styles.show : ""
        }`}
      >
        <ul>
          {gamesLinks.map((link) => (
            <li
              key={link.id}
              className={`${styles.list_item} ${styles.dropdown_list_item}`}
            >
              <Link href={link.href} className={styles.link_container}>
                <div className={styles.link_flex}>
                  {link.icon}
                  <span>{link.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
