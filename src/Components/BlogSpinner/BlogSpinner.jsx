"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styles from "./BlogSpinner.module.css";
import Image from "next/image";
import { supabase } from "@/utilities/supabase/supabase"; // Import the Supabase client

const BlogSpinner = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase.from("blogs").select("*"); // Fetch from Supabase blogs table
        if (error) {
          throw error;
        }
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return <div>Loading blogs...</div>;
  }

  return (
    <div className={styles.blog_section}>
      <Swiper
        className={styles.blog_swiper}
        spaceBetween={5}
        slidesPerView={3}
        navigation={false}
        loop={true}
        modules={[Navigation]}
      >
        {blogs.map((blog, index) => (
          <SwiperSlide key={index}>
            <div className={styles.blog_card}>
              <div
                style={{ width: "100%", height: "15rem", position: "relative" }}
              >
                <Image
                  src={blog.blog_image}
                  alt={blog.blog_header}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h3 className={styles.blog_card_title}>{blog.blog_header}</h3>
              </div>
              <div className={styles.blog_text_container}>
                <p className={styles.blog_card_text}>{blog.blog_text}</p>
              </div>
              <div>
                <button className={styles.blog_card_button}>გაიგე მეტი</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogSpinner;
