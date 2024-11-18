import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_inner}>
        <h2 className={styles.logo}>GameZone</h2>
        <div className={styles.footer_list_wrapper}>
          <div className={styles.footer_list}>
            <h4>მენიუ</h4>
            <ul>
              <li>
                <Link href={"#"}>ავტორიზაცია</Link>
              </li>
              <li>
                <Link href={"#"}>რეგისტრაცია</Link>
              </li>
              <li>
                <Link href={"#"}>შეკვეთები</Link>
              </li>
              <li>
                <Link href={"#"}>სურვილების სია</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footer_list}>
            <h4>მაღაზია</h4>
            <ul>
              <li>
                <Link href={"#"}>ჩვენს შესახებ</Link>
              </li>
              <li>
                <Link href={"#"}>პროდუქტები</Link>
              </li>
              <li>
                <Link href={"#"}>ბლოგი</Link>
              </li>
              <li>
                <Link href={"#"}>კონტაქტი</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footer_list}>
            <h4>კონტაქტი</h4>
            <ul>
              <li>
                <p>ქავთარაძის #1 / ჭავჭავაძის #37 / 2/4 რუსთაველის გამზირი</p>
              </li>
              <li>
                <p>032 2 04 07 00</p>
              </li>
              <li>
                <p>ბლოგი</p>
              </li>
              <li>
                <p>ყოველდღე - 10:00 - 22:00</p>
              </li>
              <li>
                <p>info@gamezone.ge</p>
              </li>
            </ul>
          </div>
        </div>
        <span className={styles.footer_span}></span>
        <p className={styles.footer_bot}>@GameZone 2004-2024</p>
      </div>
    </footer>
  );
};

export default Footer;
