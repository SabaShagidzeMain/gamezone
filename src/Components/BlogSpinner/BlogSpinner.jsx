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
          <SwiperSlide className={styles.spin_container} key={index}>
            <div className={styles.blog_card}>
              <div
                style={{ width: "100%", height: "15rem", position: "relative" }}
              >
                <Image
                  src={blog.blog_image}
                  alt={blog.blog_header}
                  layout="fill"
                  objectFit="cover"
                  className={styles.blog_image}
                />
              </div>
              <div className={styles.blog_info_container}>
                <div>
                  <h3 className="text-2xl my-1.5 whitespace-nowrap overflow-hidden text-ellipsis">
                    {blog.blog_header}
                  </h3>
                </div>
                <div className={styles.blog_text_container}>
                  <p className={styles.blog_card_text}>{blog.blog_text}</p>
                </div>
                <div>
                  <button className="cursor-pointer bg-[var(--button-bg)] text-[var(--button-text)] px-4 py-2 rounded hover:shadow-[var(--box-shadow)] transition-shadow duration-300">
                    გაიგე მეტი
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogSpinner;
