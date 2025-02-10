"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FreeMode } from "swiper/modules";
import Image from "next/image";
import { supabase } from "@/utilities/supabase/supabase";

interface Blog {
  id: number;
  blog_image: string;
  blog_header: string;
  blog_text: string;
}

const BlogSpinner: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase.from("blogs").select("*");
        if (error) {
          throw error;
        }
        setBlogs(data as Blog[]);
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
    <div className="px-4 py-0">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation={false}
        freeMode={true}
        loop={true}
        modules={[FreeMode]}
        breakpoints={{
          640: { slidesPerView: 3 },
        }}
      >
        {blogs.map((blog) => (
          <SwiperSlide className="my-8" key={blog.id}>
            <div className="flex flex-col shadow-[var(--box-shadow)] rounded-[8px] gap-1 cursor-pointer h-20rem">
              <div className="w-full h-40 relative">
                <Image
                  src={blog.blog_image}
                  alt={blog.blog_header}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-tl-[8px] rounded-tr-[8px]"
                />
              </div>
              <div className="p-2">
                <div>
                  <h3 className="font-bold text-[1rem] whitespace-nowrap overflow-hidden text-ellipsis">
                    {blog.blog_header}
                  </h3>
                </div>
                <div className="h-20 overflow-y-hidden mb-4">
                  <p className="text-[.8rem] mb-[15px] text-[var(--text-color)] overflow-hidden overflow-ellipsis">
                    {blog.blog_text}
                  </p>
                </div>
                <div>
                  <button className="text-[.8rem] cursor-pointer bg-[var(--button-bg)] text-[var(--button-text)] px-4 py-1 rounded hover:shadow-[var(--box-shadow)] transition-shadow duration-300">
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
