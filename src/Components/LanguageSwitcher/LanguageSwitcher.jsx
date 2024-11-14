// src/Components/LanguageSwitcher.jsx
"use client";

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
    <button onClick={toggleLanguage} className={styles.navbar_button}>
      {currentLocale === "en" ? "Ge" : "Eng"}
    </button>
  );
};

export default LanguageSwitcher;
