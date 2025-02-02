"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utilities/supabase/supabase"; // Assuming you have a supabase client utility set up
import Image from "next/image";
import "./blogs.css";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Fetch blogs from Supabase
        const { data, error } = await supabase.from("blogs").select("*");
        if (error) {
          console.error("Error fetching blogs:", error);
          return;
        }

        // Set the blogs state
        setBlogs(data);

        // Randomly select a featured blog
        if (data.length > 0) {
          const randomBlog = data[Math.floor(Math.random() * data.length)];
          setFeaturedBlog(randomBlog);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>

      {/* Featured Blog Section */}
      {featuredBlog && (
        <div className="featured-blog">
          <h2>Featured Blog</h2>
          <h3>{featuredBlog.blog_header}</h3>
          <p>{featuredBlog.blog_text}</p>
          <Image
            src={featuredBlog.blog_image}
            alt={featuredBlog.title}
            width={500}
            height={300}
          />
        </div>
      )}

      {/* List of Blogs */}
      <div className="blog-list">
        <h2>Other Blogs</h2>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <h3>{blog.blog_header}</h3>
              <p>{blog.blog_text}</p>
              <Image
                src={blog.blog_image}
                alt={blog.title}
                width={200}
                height={150}
              />
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
