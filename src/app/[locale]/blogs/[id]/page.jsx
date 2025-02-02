"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utilities/supabase/supabase"; // Assuming you have a supabase client utility set up
import Image from "next/image";
import { usePathname } from "next/navigation"; // Use this to get the current path and extract params
import "./blogsdetails.css";

const BlogDetailPage = () => {
  const [blog, setBlog] = useState(null); // State for storing the blog
  const pathname = usePathname(); // Get the current path
  const blogId = pathname.split("/").pop(); // Extract the blog ID from the pathname

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return; // If no blogId is available, return early

      try {
        // Fetch the specific blog from Supabase based on the ID
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", blogId) // Filter by the blog ID
          .single(); // We expect only one blog

        if (error) {
          console.error("Error fetching blog:", error);
          return;
        }

        setBlog(data); // Set the blog state
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]); // Run the effect when the `blogId` changes

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-detail-wrapper">
      <h1>{blog.blog_header}</h1>
      <Image
        src={blog.blog_image}
        alt={blog.blog_header}
        width={600}
        height={400}
      />
      <p>{blog.blog_text}</p>
    </div>
  );
};

export default BlogDetailPage;
