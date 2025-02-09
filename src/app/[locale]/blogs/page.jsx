"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/utilities/supabase/supabase";

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
    <div className="mt-16">
      {featuredBlog && (
        <div className="bg-[var(--background-color)] rounded-[8px] text-[var(--text-color)] flex flex-col h-auto md:flex-row gap-4 justify-between items-center m-4 md:m-8 shadow-[var(--box-shadow)] md:h-96">
          {/* Left Section */}
          <div className="flex-1 h-full p-4 md:p-2 w-full">
            <div className="md:w-full h-full flex flex-col items-start justify-between gap-4 md:gap-8">
              <h2 className="text-[0.8rem] md:text-[1rem] font-bold">
                Featured Blog
              </h2>
              <h3 className="font-bold text-[1.25rem] md:text-[1.5rem]">
                {featuredBlog.blog_header}
              </h3>
              <p className="h-24 w-full overflow-hidden overflow-ellipsis text-sm md:text-base">
                {featuredBlog.blog_text}
              </p>
              <button
                className="w-32 h-10 rounded-[5px] font-bold text-[#fff] cursor-pointer bg-[var(--accent-color)]"
                onClick={() => handleBlogClick(featuredBlog.id)}
              >
                Read more
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div
            className="flex-1 h-[15rem] md:h-full bg-cover bg-center bg-no-repeat rounded-tl-[0] rounded-br-[8px] rounded-tr-[8px] rounded-bl-[0] relative overflow-hidden"
            style={{ backgroundImage: `url('${featuredBlog.blog_image}')` }}
          >
            {/* Big white triangle in the top-left corner */}
            <div
              className="absolute top-0 left-0 w-[5%] h-full bg-[var(--background-color)] md:w-[40%]"
              style={{ clipPath: "polygon(0 0, 0% 100%, 100% 0)" }}
            ></div>

            {/* Small white triangle in the bottom-right corner */}
            <div
              className="absolute bottom-0 right-0 w-[60px] md:w-[80px] h-[80px] md:h-[100px] bg-[var(--background-color)]"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0% 100%)" }}
            ></div>
          </div>
        </div>
      )}

      {/* List of Blogs */}
      <div className="flex w-full flex-col justify-center items-center p-8 gap-4 text-[#001219]">
        <div className="p-[0.6rem] bg-[#fff] shadow-[var(--box-shadow)] w-full h-8 rounded-[8px] flex justify-start items-center">
          <input
            className="w-[100%]"
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
          />
        </div>
        <div className="flex justify-center items-center gap-4 text-[var(--text-color)] flex-wrap w-full">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="shadow-[var(--box-shadow)] w-full flex flex-col md:bg-[var(--background-color)] rounded-[8px] h-72 md:w-[48%]"
              >
                <div
                  className="rounded-tl-[8px] rounded-tr-[8px] w-full h-[12rem] bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('${blog.blog_image}')`,
                  }}
                ></div>
                <div className="flex flex-col justify-between items-start h-full m-4">
                  <h3>{blog.blog_header}</h3>
                  <div className="h-16 overflow-hidden">
                    <p>{blog.blog_text}</p>
                  </div>
                  {/* Button to navigate to the dynamic blog page */}
                  <button
                    className="w-25 h-7 my-1 rounded-[5px] font-bold text-[#fff] text-[.8rem] cursor-pointer bg-[var(--accent-color)]"
                    onClick={() => handleBlogClick(blog.id)}
                  >
                    Read more
                  </button>
                </div>
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
