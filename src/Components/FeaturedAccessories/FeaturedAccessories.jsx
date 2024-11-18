"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styles from "./FeaturedAccessories.module.css";
import Image from "next/image";
import featuredAccessoriesArr from "@/utilities/featuredAccessoriesArr/featuredAccessoriesArr";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const FeaturedAccessories = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const [selectedAccessory, setSelectedAccessory] = useState(
    featuredAccessoriesArr[0]
  );
  const [activeIndex, setActiveIndex] = useState(0); // Track active slide index

  const handleProductClick = (accessory, index) => {
    setSelectedAccessory(accessory);
    setActiveIndex(index); // Update active index when a slide is clicked
  };

  const { name, description, image: selectedImage } = selectedAccessory;

  return (
    <div className={styles.accessories_section}>
      <div className={styles.selected_product}>
        <div className={styles.selected_product_info}>
          <h2 className={styles.selected_product_header}>
            {t("featured-accessories.header")}
          </h2>
          <h3 className={styles.selected_product_name}>{name}</h3>
          <p className={styles.selected_product_desc}>{description}</p>
          <div className={styles.selected_product_button_container}>
            <button className={styles.selected_product_button}>
              {t("featured-accessories.button-1")}
            </button>
            <button className={styles.selected_product_button}>
              {" "}
              {t("featured-accessories.button-2")}
            </button>
          </div>
        </div>
        <div className={styles.selected_product_image}>
          <Image src={selectedImage} alt={name} width={800} height={450} />
        </div>
      </div>

      <Swiper
        className={styles.accessory_swiper}
        spaceBetween={5}
        slidesPerView={6}
        navigation={true}
        modules={[Navigation]}
      >
        {featuredAccessoriesArr.map((accessory, index) => (
          <SwiperSlide key={accessory.id}>
            <div
              className={`${styles.accessory_card} ${
                activeIndex === index ? styles.active : ""
              }`}
              onClick={() => handleProductClick(accessory, index)}
            >
              <Image
                src={accessory.image}
                alt={accessory.name}
                width={150}
                height={80}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedAccessories;
