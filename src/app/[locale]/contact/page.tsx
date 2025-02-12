"use client";
import React from "react";
import ContactForm from "@/Components/ContactForm/ContactForm";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations();
  return (
    <div className="my-[5rem] md:m-[5rem] flex flex-col gap-[2rem] text-center">
      <h3 className="font-bold text-[2rem]">{t("contact-page.c1")}</h3>
      <div className="flex w-[100%] flex-col md:flex-row justify-center items-center md:items-start gap-[2rem]">
        <div className="w-[100%] flex justify-center md:justify-end items-center">
          <ContactForm />
        </div>
        <div className="flex w-[100%] flex-col justify-start align-start gap-[1rem] text-center md:text-left">
          <div>
            <h4 className="font-bold">{t("contact-page.c6")}</h4>
            <ul className="flex flex-col gap-2 text-[0.8rem]">
              <li>
                <p>{t("contact-page.c7")}</p>
              </li>
              <li>
                <p>{t("contact-page.c8")}</p>
              </li>
              <li>
                <p>{t("contact-page.c9")}</p>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">{t("contact-page.c4")}:</h4>
            <ul className="flex flex-col gap-2 text-[0.8rem]">
              <li>
                <p>Info@Gamezone.ge</p>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">{t("contact-page.c10")}:</h4>
            <ul className="flex flex-col gap-2 text-[0.8rem]">
              <li>
                <p>032 2 04 07 00</p>
              </li>
            </ul>
          </div>
          <div className="w-[100%] p-[2rem] md:p-0 md:w-[50%]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190641.91507415482!2d44.724555581563045!3d41.70368643747309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4044739caf83ab29%3A0x41fdfc8ed326aa6e!2sGame%20Zone!5e0!3m2!1sen!2sge!4v1739359059123!5m2!1sen!2sge"
              width=""
              height=""
              loading="lazy"
              className="w-[100%] h-[12rem]"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
