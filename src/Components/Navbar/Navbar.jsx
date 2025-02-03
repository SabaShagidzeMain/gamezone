"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useCart } from "@/utilities/CartContext/CartContext";
import handlePurchase from "@/utilities/handlePurchase/handlePurchase";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

// Icons
import {
  FaMoon,
  FaSun,
  FaArrowDown,
  FaRegUserCircle,
  FaShoppingCart,
} from "react-icons/fa";
import { MdDensitySmall } from "react-icons/md";
import {
  SiPlaystation5,
  SiPlaystation4,
  SiXbox,
  SiNintendoswitch,
  SiOculus,
} from "react-icons/si";
import { PiGameControllerLight } from "react-icons/pi";
import { GiConsoleController } from "react-icons/gi";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { cart, removeFromCart } = useCart();
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  // Theme handling
  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.theme = newMode ? "dark" : "light";
    setIsDarkMode(newMode);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Navigation Data
  const consolesLinks = [
    {
      id: "ps5",
      href: "/consoles/ps5",
      icon: <SiPlaystation5 size={24} />,
      label: "PS5",
    },
    {
      id: "ps4",
      href: "/consoles/ps4",
      icon: <SiPlaystation4 size={24} />,
      label: "PS4",
    },
    {
      id: "xbox",
      href: "/consoles/xbox",
      icon: <SiXbox size={24} />,
      label: "Xbox",
    },
    {
      id: "nintendo",
      href: "/consoles/nintendo",
      icon: <SiNintendoswitch size={24} />,
      label: "Nintendo",
    },
  ];

  const gamesLinks = [
    {
      id: "ps5-games",
      href: `/${locale}/games/ps5`,
      icon: <PiGameControllerLight size={24} />,
      label: `PS5 ${t("header.games")}`,
    },
    {
      id: "ps4-games",
      href: `/${locale}/games/ps4`,
      icon: <GiConsoleController size={24} />,
      label: `PS4 ${t("header.games")}`,
    },
    {
      id: "xbox-games",
      href: `/${locale}/games/xbox`,
      icon: <SiXbox size={24} />,
      label: `Xbox ${t("header.games")}`,
    },
    {
      id: "nintendo-games",
      href: `/${locale}/games/nintendo`,
      icon: <SiNintendoswitch size={24} />,
      label: `Nintendo ${t("header.games")}`,
    },
    {
      id: "vr-games",
      href: `/${locale}/games/vr`,
      icon: <SiOculus size={24} />,
      label: `VR ${t("header.games")}`,
    },
    {
      id: "all-games",
      href: `/${locale}/games/all`,
      icon: <MdDensitySmall size={24} />,
      label: t("header.all-games"),
    },
  ];

  const navLinks = [
    { label: t("header.accessories") },
    { href: `/${locale}/subscription`, label: t("header.sub") },
    { href: `/${locale}/blogs`, label: "Blogs" },
    { label: t("header.about") },
    { label: t("header.contact") },
  ];

  return (
    <div className="">
      <nav className="fixed top-0 left-0 w-full h-16 z-50 flex justify-between items-center px-4 bg-[var(--background-color)] text-[var(--text-color)] shadow-lg dark:shadow-white/20">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold">
            GameZone
          </Link>

          <ul className="flex items-center gap-4 text-sm">
            {/* Consoles Dropdown */}
            <li className="cursor-pointer">
              <button
                onClick={() => toggleDropdown("consoles")}
                className="cursor-pointer flex items-center gap-1 hover:text-[var(--accent-color)] transition-colors"
              >
                {t("header.consoles")}
                <FaArrowDown
                  className={`transition-transform ${
                    activeDropdown === "consoles" ? "rotate-180" : ""
                  }`}
                />
              </button>
            </li>

            {/* Games Dropdown */}
            <li className="cursor-pointer">
              <button
                onClick={() => toggleDropdown("games")}
                className="cursor-pointer flex items-center gap-1 hover:text-[var(--accent-color)] transition-colors"
              >
                {t("header.games")}
                <FaArrowDown
                  className={`transition-transform ${
                    activeDropdown === "games" ? "rotate-180" : ""
                  }`}
                />
              </button>
            </li>

            {/* Other Links */}
            {navLinks.map((link, index) => (
              <li className="cursor-pointer" key={index}>
                {link.href ? (
                  <Link
                    href={link.href}
                    className="cursor-pointer hover:text-[var(--accent-color)] transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button className="cursor-pointer hover:text-[var(--accent-color)] transition-colors">
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/login`}
            className="p-2 hover:text-[var(--accent-color)]"
          >
            <FaRegUserCircle size={20} />
          </Link>

          <LanguageSwitcher />

          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="p-2 hover:text-[var(--accent-color)] relative"
          >
            <FaShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 hover:text-[var(--accent-color)]"
          >
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

        {/* Cart Dropdown */}
        {isCartOpen && (
          <div className="absolute top-16 right-4 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-2">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-2"
                    >
                      <Image
                        src={item.main_images.disc}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                      <div className="flex-1">
                        <p className="text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          ${item.price / 100}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    handlePurchase(
                      cart.map((item) => item.id),
                      locale
                    )
                  }
                  className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Go to Checkout
                </button>
              </>
            )}
          </div>
        )}

        {/* Dropdown Menus */}
        <div
          className={`absolute top-16 left-0 w-full bg-[var(--background-color)] shadow-lg transition-all duration-300 ${
            activeDropdown
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4"
          }`}
        >
          <div className="container mx-auto py-4">
            <div className="flex justify-center items-center gap-4">
              {/* Render consoles links only when activeDropdown is 'consoles' */}
              {activeDropdown === "consoles" &&
                consolesLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="flex w-[100%] flex-col items-center gap-2 p-4 hover:bg-[var(--text-color)] hover:text-[var(--background-color)] rounded-lg transition-colors"
                  >
                    {link.icon}
                    <span className="text-sm text-center">{link.label}</span>
                  </Link>
                ))}

              {/* Render games links only when activeDropdown is 'games' */}
              {activeDropdown === "games" &&
                gamesLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="flex w-[100%] flex-col items-center gap-2 p-4 hover:bg-[var(--text-color)] hover:text-[var(--background-color)] rounded-lg transition-colors"
                  >
                    {link.icon}
                    <span className="text-sm text-center">{link.label}</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
