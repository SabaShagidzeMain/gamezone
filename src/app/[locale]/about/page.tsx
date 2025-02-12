import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import {
  TbTruckDelivery,
  TbReceiptTax,
  TbBrandMastercard,
} from "react-icons/tb";

const Page = () => {
  const t = useTranslations();
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="w-full h-[25rem]">
          <Image
            src={"/images/banners/about-banner.png"}
            alt={"about banner"}
            width={1000}
            height={1000}
            quality={100}
            className="w-full h-[25rem] object-cover object-top"
          ></Image>
        </div>
        <div className="flex justify-center items-center flex-col text-center gap-8">
          <div className="w-full flex flex-col justify-center items-center">
            <h3 className="font-bold text-[1.2rem]">
              {t("about-page.header")}
            </h3>
            <p className="text-[0.9rem] w-4/5">{t("about-page.ap1")}</p>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <h3 className="font-bold text-[1.2rem]">{t("about-page.ah2")}</h3>
            <p className="text-[0.9rem] w-4/5">{t("about-page.ap2")}</p>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <h3 className="font-bold text-[1.2rem]">{t("about-page.ah3")}</h3>
            <p className="text-[0.9rem] w-4/5">{t("about-page.ap3")}</p>
          </div>
          <div className="flex flex-col gap-8 w-4/5 justify-center items-center">
            <span className="h-[0.1rem] w-full bg-[var(--text-color)]"></span>
            <div className="flex gap-2 flex-col md:flex-row">
              <div className="flex gap-2">
                <div>
                  <TbTruckDelivery className="text-[3rem]" />
                </div>
                <div className="flex flex-col justify-center items-start w-48">
                  <h4 className="text-[0.8rem] font-bold">
                    {t("about-page.ah4")}
                  </h4>
                  <p className="text-[0.6rem] text-left">
                    {t("about-page.ap4")}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div>
                  <TbReceiptTax className="text-[3rem]" />
                </div>
                <div className="flex flex-col justify-center items-start w-48">
                  <h4 className="text-[0.8rem] font-bold">
                    {t("about-page.ah5")}
                  </h4>
                  <p className="text-[0.6rem] text-left">
                    {t("about-page.ap5")}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div>
                  <TbBrandMastercard className="text-[3rem]" />
                </div>
                <div className="flex flex-col justify-center items-start w-48">
                  <h4 className="text-[0.8rem] font-bold">
                    {t("about-page.ah6")}
                  </h4>
                  <p className="text-[0.6rem] text-left">
                    {t("about-page.ap6")}
                  </p>
                </div>
              </div>
            </div>
            <span className="h-[0.1rem] w-full bg-[var(--text-color)]"></span>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <h3 className="font-bold text-[1.2rem]">{t("about-page.ah7")}</h3>
            <p>{t("about-page.ap7")}</p>
            <p className="text-[.6rem]">{t("about-page.ap8")} </p>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <h3 className="font-bold text-[1.2rem]">{t("about-page.ah9")}</h3>
            <p className="text-[0.9rem] w-4/5">{t("about-page.ap9")}</p>
            <p className="text-[.6rem]">info@gamezone.ge</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
