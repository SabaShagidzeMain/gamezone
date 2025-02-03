import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#001219] text-white shadow-[var(--box-shadow)]">
      <div className="container mx-auto px-4 py-8 md:px-8">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Logo */}
          <h2 className="text-2xl font-bold md:text-3xl">GameZone</h2>

          {/* Columns Container */}
          <div className="flex flex-col gap-8 md:flex-row md:flex-wrap md:justify-between">
            {/* Menu Column */}
            <div className="space-y-4 md:flex-1 md:min-w-[45%] lg:min-w-[20%]">
              <h4 className="text-lg font-semibold md:text-xl">მენიუ</h4>
              <ul className="space-y-2">
                {[
                  "ავტორიზაცია",
                  "რეგისტრაცია",
                  "შეკვეთები",
                  "სურვილების სია",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-gray-300 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shop Column */}
            <div className="space-y-4 md:flex-1 md:min-w-[45%] lg:min-w-[20%]">
              <h4 className="text-lg font-semibold md:text-xl">მაღაზია</h4>
              <ul className="space-y-2">
                {["ჩვენს შესახებ", "პროდუქტები", "ბლოგი", "კონტაქტი"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="hover:text-gray-300 transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="space-y-4 md:min-w-full lg:flex-1 lg:min-w-[50%]">
              <h4 className="text-lg font-semibold md:text-xl">კონტაქტი</h4>
              <ul className="space-y-3">
                <li className="max-w-[300px]">
                  ქავთარაძის #1 / ჭავჭავაძის #37 / 2/4 რუსთაველის გამზირი
                </li>
                <li>
                  <a
                    href="tel:0322040700"
                    className="hover:text-gray-300 transition-colors"
                  >
                    032 2 04 07 00
                  </a>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-gray-300 transition-colors"
                  >
                    ბლოგი
                  </Link>
                </li>
                <li>ყოველდღე - 10:00 - 22:00</li>
                <li>
                  <a
                    href="mailto:info@gamezone.ge"
                    className="hover:text-gray-300 transition-colors"
                  >
                    info@gamezone.ge
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-4 border-gray-600" />

          {/* Copyright */}
          <p className="text-center text-sm text-gray-400 md:text-base">
            @GameZone 2004-2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
