"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styles from "./BlogSpinner.module.css";
import Image from "next/image";
import axios from "axios";

const BlogSpinner = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return <div>Loading blogs...</div>; // You can add a loading spinner here
  }

  return (
    <div className={styles.blog_section}>
      <Swiper
        className={styles.blog_swiper}
        spaceBetween={5}
        slidesPerView={3}
        navigation={false}
        loop={true} // This makes the swiper infinite
        modules={[Navigation]}
      >
        {blogs.map((blog, index) => (
          <SwiperSlide key={index}>
            <div className={styles.blog_card}>
              <div
                style={{ width: "100%", height: "12rem", position: "relative" }}
              >
                <Image
                  src={blog.image}
                  alt={blog.title}
                  layout="fill" // This makes the image fill the parent container
                  objectFit="cover" // This ensures the image maintains its aspect ratio and fills the container
                />
              </div>
              <h3 className={styles.blog_card_title}>{blog.title}</h3>
              <p className={styles.blog_card_text}>{blog.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogSpinner;
