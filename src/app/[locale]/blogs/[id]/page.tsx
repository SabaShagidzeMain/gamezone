"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utilities/supabase/supabase";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./blogsdetails.css";

interface Blog {
  id: string;
  blog_header: string;
  blog_text: string;
  blog_image: string;
  created_at: string;
  created_by: string;
  created_by_uuid: string;
}

const BlogDetailPage = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const pathname = usePathname();
  const blogId = pathname?.split("/").pop() || "";

  useEffect(() => {
    const fetchBlog = async () => {
      if (!blogId) return;

      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", blogId)
          .single();

        if (error) {
          console.error("Error fetching blog:", error);
          return;
        }

        if (data) {
          setBlog(data as Blog);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

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
        priority
      />
      <p>{blog.blog_text}</p>
    </div>
  );
};

export default BlogDetailPage;