"use client";

import { FaGlobeEurope } from "react-icons/fa";

import styles from "../Navbar/navbar.module.css";
import { useRouter, usePathname } from "next/navigation";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.startsWith("/ge") ? "ge" : "en";
  const toggleLanguage = () => {
    const newLocale = currentLocale === "en" ? "ge" : "en";

    const newPath = `/${newLocale}${pathname.slice(3)}`;
    router.push(newPath);
  };

  return (
    <button onClick={toggleLanguage} className={styles.nav_right_icon}>
      {/* {currentLocale === "en" ? "Ge" : "Eng"} */}
      <FaGlobeEurope className={styles.nav_icon} />
    </button>
  );
};

export default LanguageSwitcher;
