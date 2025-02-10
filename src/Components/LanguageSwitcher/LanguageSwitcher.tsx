"use client";

import { FaGlobeEurope } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale: "en" | "ge" =
    pathname && pathname.startsWith("/ge") ? "ge" : "en";

  const toggleLanguage = () => {
    const newLocale: "en" | "ge" = currentLocale === "en" ? "ge" : "en";

    const newPath = `/${newLocale}${pathname?.slice(3) || ""}`;
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex justify-center items-center cursor-pointer h-6 w-6 hover:text-[var(--accent-color)] [transition:.3s_ease-in-out]"
    >
      <FaGlobeEurope size={25} />
    </button>
  );
};

export default LanguageSwitcher;
