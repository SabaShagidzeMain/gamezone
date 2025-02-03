"use client";

import { FaGlobeEurope } from "react-icons/fa";

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
    <button
      onClick={toggleLanguage}
      className="flex justify-center items-center cursor-pointer h-6 w-6"
    >
      {/* {currentLocale === "en" ? "Ge" : "Eng"} */}
      <FaGlobeEurope className="h-8 w-8" />
    </button>
  );
};

export default LanguageSwitcher;
