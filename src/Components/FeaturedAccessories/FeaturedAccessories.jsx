"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styles from "./FeaturedAccessories.module.css";
import Image from "next/image";

const accessories = [
  {
    id: 1,
    name: "DualSense Wireless Controller",
    description: "Discover A Deeper, Highly Immersive Gaming Experience",
    image:
      "/images/featuredAccessories/dualsense-edge-featured-hardware-image-block-01-en-11aug23.webp",
  },
  {
    id: 2,
    name: "Pulse 3D Wireless Headset",
    description: "Enjoy A Seamless, Wireless Audio Experience,",
    image:
      "/images/featuredAccessories/hd-camera-featured-hardware-image-block-01-en-11aug23.webp",
  },
  {
    id: 3,
    name: "Pulse 3D Wireless Headset",
    description: "Enjoy A Seamless, Wireless Audio Experience,",
    image:
      "/images/featuredAccessories/PULSE-Elite-headset-thumbnail-01-en-08sep23.webp",
  },
  {
    id: 4,
    name: "Pulse 3D Wireless Headset",
    description: "Enjoy A Seamless, Wireless Audio Experience,",
    image:
      "/images/featuredAccessories/PULSE-Elite-headset-thumbnail-01-en-08sep23.webp",
  },
  {
    id: 5,
    name: "DualSense Wireless Controller",
    description: "Discover A Deeper, Highly Immersive Gaming Experience",
    image:
      "/images/featuredAccessories/dualsense-edge-featured-hardware-image-block-01-en-11aug23.webp",
  },
  {
    id: 6,
    name: "Pulse 3D Wireless Headset",
    description: "Enjoy A Seamless, Wireless Audio Experience,",
    image:
      "/images/featuredAccessories/hd-camera-featured-hardware-image-block-01-en-11aug23.webp",
  },
  {
    id: 7,
    name: "Pulse 3D Wireless Headset",
    description: "Enjoy A Seamless, Wireless Audio Experience,",
    image:
      "/images/featuredAccessories/PULSE-Elite-headset-thumbnail-01-en-08sep23.webp",
  },
  {
    id: 8,
    name: "Pulse 3D Wireless Headset",
    description: "Enjoy A Seamless, Wireless Audio Experience,",
    image:
      "/images/featuredAccessories/PULSE-Elite-headset-thumbnail-01-en-08sep23.webp",
  },
];

const FeaturedAccessories = () => {
  const [selectedAccessory, setSelectedAccessory] = useState(accessories[0]);

  const handleProductClick = (accessory) => {
    setSelectedAccessory(accessory);
  };

  return (
    <>
      <div className={styles.accessories_section}>
        <div className={styles.selected_product}>
          <div className={styles.selected_product_info}>
            <h2 className={styles.selected_product_header}>
              Discover All Accessories
            </h2>
            <h3 className={styles.selected_product_name}>
              {selectedAccessory.name}
            </h3>
            <p className={styles.selected_product_desc}>
              {selectedAccessory.description}
            </p>
            <div className={styles.selected_product_button_container}>
              <button className={styles.selected_product_button}>გაიგე მეტი</button>
              <button className={styles.selected_product_button}>შეძენა</button>
            </div>
          </div>
          <div className={styles.selected_product_image}>
            <Image
              src={selectedAccessory.image}
              alt={selectedAccessory.name}
              width={800}
              height={450}
            />
          </div>
        </div>

        <Swiper
          className={styles.accessory_swiper}
          spaceBetween={5}
          slidesPerView={6}
          navigation={true}
          modules={[Navigation]}
        >
          {accessories.map((accessory, index) => (
            <SwiperSlide
              key={index}
              onClick={() => handleProductClick(accessory)}
            >
              <div className={styles.accessory_card}>
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
    </>
  );
};

export default FeaturedAccessories;
