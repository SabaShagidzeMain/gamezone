import styles from "./linkArray.module.css";
import { usePathname } from "next/navigation";
import {
  SiOculus,
  SiPlaystation5,
  SiPlaystation4,
  SiXbox,
  SiNintendoswitch,
} from "react-icons/si";
import { PiGameControllerLight } from "react-icons/pi";
import { GiConsoleController } from "react-icons/gi";
import { MdDensitySmall } from "react-icons/md";
import Link from "next/link";

const LinkArray = () => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  consolesLinks: [
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

  gamesLinks: [
    {
      id: "ps5-games",
      href: `/${locale}/games/ps5`, // Directly link to the dynamic platform route
      platform: "ps5",
      icon: <PiGameControllerLight className={styles.dropdown_logo} />,
      label: `PS5 ${t("header.games")}`,
    },
    {
      id: "ps4-games",
      href: `/${locale}/games/ps4`, // Directly link to the dynamic platform route
      platform: "ps4",
      icon: <GiConsoleController className={styles.dropdown_logo} />,
      label: `PS4 ${t("header.games")}`,
    },
    {
      id: "xbox-games",
      href: `/${locale}/games/xbox`, // Directly link to the dynamic platform route
      platform: "xbox",
      icon: <SiXbox className={styles.dropdown_logo} />,
      label: `Xbox ${t("header.games")}`,
    },
    {
      id: "nintendo-games",
      href: `/${locale}/games/nintendo`, // Directly link to the dynamic platform route
      platform: "nintendo",
      icon: <SiNintendoswitch className={styles.dropdown_logo} />,
      label: `Nintendo ${t("header.games")}`,
    },
    {
      id: "vr-games",
      href: `/${locale}/games/vr`, // Directly link to the dynamic platform route
      platform: "vr",
      icon: <SiOculus className={styles.dropdown_logo} />,
      label: `VR ${t("header.games")}`,
    },
    {
      id: "all-games",
      href: `/${locale}/games/all`, // Directly link to the dynamic platform route
      platform: "all",
      icon: <MdDensitySmall className={styles.dropdown_logo} />,
      label: `${t("header.all-games")}`,
    },
  ];

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
  </div>;

  {
    /* Dropdown for Games */
  }
  <div
    className={`${styles.dropdownMenu} ${
      activeDropdown === "games" ? styles.show : ""
    }`}
  >
    <ul className={styles.dropdown_list}>
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
  </div>;
};

export default LinkArray;
