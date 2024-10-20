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
    image: "/images/featuredAccessories/pair-joy-con.png",
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
    name: "Pulse 3D Wireless Headset",
    description: "Enjoy A Seamless, Wireless Audio Experience,",
    image: "/images/featuredAccessories/razer-gamepad.png",
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
      "/images/featuredAccessories/hd-camera-featured-hardware-image-block-01-en-11aug23.webp",
  },
  {
    id: 8,
    name: "Pulse 3D Wireless Headset",
    description: "Enjoy A Seamless, Wireless Audio Experience,",
    image:
      "/images/featuredAccessories/hd-camera-featured-hardware-image-block-01-en-11aug23.webp",
  },
  {
    id: 9,
    name: "Pulse 3D Wireless Headset",
    description: "Enjoy A Seamless, Wireless Audio Experience,",
    image:
      "/images/featuredAccessories/hd-camera-featured-hardware-image-block-01-en-11aug23.webp",
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
        <h2>Discover All Accessories</h2>
        <div className={styles.selected_product}>
          <Image
            src={selectedAccessory.image}
            alt={selectedAccessory.name}
            width={400}
            height={400}
          />
          <h3>{selectedAccessory.name}</h3>
          <p>{selectedAccessory.description}</p>
        </div>

        <Swiper
          className={styles.accessory_swiper}
          spaceBetween={10}
          slidesPerView={6}
          navigation={true}
          modules={[Navigation]}
        >
          {accessories.map((accessory, index) => (
            <SwiperSlide
              key={index}
              onClick={() => handleProductClick(accessory)}
            >
              <div className={styles.accesory_card}>
                <Image
                  src={accessory.image}
                  alt={accessory.name}
                  width={200}
                  height={100}
                />
                <h4>{accessory.name}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default FeaturedAccessories;
