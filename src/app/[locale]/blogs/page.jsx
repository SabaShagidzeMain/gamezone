"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/utilities/supabase/supabase";
import Image from "next/image";
import styles from "./blogs.module.css"; // Update the path if necessary

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // For the search query

  const router = useRouter();
  const pathname = usePathname(); // Get current pathname

  // Ensure pathname is available before attempting to split it
  const locale = pathname ? pathname.split("/")[1] : ""; // Extract the locale from the path (e.g., "en")
  const blogId = pathname ? pathname.split("/").pop() : ""; // Get the blog ID from the URL

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

  // Filter blogs based on the search query
  const filteredBlogs = blogs.filter((blog) => {
    return (
      blog.blog_header.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.blog_text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Navigate to the dynamic blog page using the id
  const handleBlogClick = (id) => {
    router.push(`/${locale}/blogs/${id}`);
  };

  return (
    <div className={styles.blogsWrapper}>
      {featuredBlog && (
        <div className={styles.featuredBlog}>
          <h2>Featured Blog</h2>
          <h3>{featuredBlog.blog_header}</h3>
          <p>{featuredBlog.blog_text}</p>
          <Image
            src={featuredBlog.blog_image}
            alt={featuredBlog.blog_header}
            width={500}
            height={300}
          />
        </div>
      )}

      {/* List of Blogs */}
      <div className={styles.blogContainer}>
        <h2>Other Blogs</h2>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
          />
        </div>
        <div className={styles.blogList}>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div key={blog.id} className={styles.blogCard}>
                <Image
                  src={blog.blog_image}
                  alt={blog.blog_header}
                  width={200}
                  height={150}
                />
                <h3>{blog.blog_header}</h3>
                <div className={styles.blogTextWrapper}>
                  <p>{blog.blog_text}</p>
                </div>
                {/* Button to navigate to the dynamic blog page */}
                <button onClick={() => handleBlogClick(blog.id)}>
                  Read more
                </button>
              </div>
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
