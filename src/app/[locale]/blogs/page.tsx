"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/utilities/supabase/supabase";

interface Blog {
  id: string;
  blog_header: string;
  blog_text: string;
  blog_image: string;
  created_at: string;
  created_by: string;
  created_by_uuid: string;
}

interface User {
  id: string;
  user_metadata: {
    username?: string;
  };
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [featuredBlog, setFeaturedBlog] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [blogHeader, setBlogHeader] = useState("");
  const [blogText, setBlogText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "";

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setBlogHeader(blog.blog_header);
    setBlogText(blog.blog_text);
    setShowCreateForm(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) setCurrentUserId(user.id);
      if (error) console.error("Error fetching user:", error);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) {
        setBlogs(data as Blog[]);
        if (data.length > 0) {
          setFeaturedBlog(data[0] as Blog);
        }
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("blogs")
        .upload(fileName, file);

      if (error) throw error;
      return data.path;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleCreatePost = async (e: FormEvent) => {
    e.preventDefault();
    if (!blogHeader || !blogText || !selectedImage) return;

    setIsUploading(true);
    try {
      // Get the current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (!user || userError) throw new Error("User not authenticated");

      // Handle image upload
      const imagePath = await handleImageUpload(selectedImage);
      const { data: imageData } = await supabase.storage
        .from("blogs")
        .getPublicUrl(imagePath);

      if (!imageData) throw new Error("Failed to get public URL for the image");

      // Create or update blog post
      if (editingBlog) {
        const { data, error } = await supabase
          .from("blogs")
          .update({
            blog_header: blogHeader,
            blog_text: blogText,
            blog_image: imageData.publicUrl,
          })
          .eq("id", editingBlog.id)
          .select();

        if (error) throw error;
        if (data) {
          setBlogs(
            blogs.map((b) => (b.id === editingBlog.id ? (data[0] as Blog) : b))
          );
        }
        setEditingBlog(null);
      } else {
        const { data, error } = await supabase
          .from("blogs")
          .insert([
            {
              blog_header: blogHeader,
              blog_text: blogText,
              blog_image: imageData.publicUrl,
              created_at: new Date().toISOString(),
              created_by: user.user_metadata?.username || "Unknown User",
              created_by_uuid: user.id,
            },
          ])
          .select();

        if (error) throw error;
        if (data) {
          setBlogs([data[0] as Blog, ...blogs]);
        }
      }

      setShowCreateForm(false);
      resetForm();
    } catch (error) {
      console.error("Error creating/updating post:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setBlogHeader("");
    setBlogText("");
    setSelectedImage(null);
  };

  const handleDeleteBlog = async (blogId: string, imagePath: string) => {
    try {
      await supabase.storage.from("blogs").remove([imagePath]);
      const { error } = await supabase.from("blogs").delete().eq("id", blogId);
      if (error) throw error;
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.blog_header.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.blog_text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBlogClick = (id: string) => {
    router.push(`/${locale}/blogs/${id}`);
  };

  return (
    <div className="mt-16">
      {/* Create Post Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
            <h2 className="text-2xl font-bold mb-4">Create New Blog Post</h2>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <input
                type="text"
                placeholder="Blog Header"
                value={blogHeader}
                onChange={(e) => setBlogHeader(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                placeholder="Blog Content"
                value={blogText}
                onChange={(e) => setBlogText(e.target.value)}
                className="w-full p-2 border rounded h-32"
                required
              />
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  setSelectedImage(file);
                }}
                className="w-full p-2 border rounded"
                accept="image/*"
                required
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="bg-[var(--accent-color)] text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  {isUploading ? "Uploading..." : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Featured Blog Section */}
      {featuredBlog && (
        <div className="bg-[var(--background-color)] rounded-[8px] text-[var(--text-color)] flex flex-col h-auto md:flex-row gap-4 justify-between items-center m-4 md:m-8 shadow-[var(--box-shadow)] md:h-96">
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
          <div
            className="flex-1 h-[15rem] md:h-full bg-cover bg-center bg-no-repeat rounded-tl-[0] rounded-br-[8px] rounded-tr-[8px] rounded-bl-[0] relative overflow-hidden"
            style={{ backgroundImage: `url('${featuredBlog.blog_image}')` }}
          >
            <div
              className="absolute top-0 left-0 w-[5%] h-full bg-[var(--background-color)] md:w-[40%]"
              style={{ clipPath: "polygon(0 0, 0% 100%, 100% 0)" }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-[60px] md:w-[80px] h-[80px] md:h-[100px] bg-[var(--background-color)]"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0% 100%)" }}
            ></div>
          </div>
        </div>
      )}

      {/* Blog List Section */}
      <div className="flex w-full flex-col justify-center items-center p-8 gap-4 text-[#001219]">
        <div className="p-[0.6rem] bg-[#fff] shadow-[var(--box-shadow)] w-full h-8 rounded-[8px] flex justify-start items-center">
          <input
            className="w-[100%]"
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Create Post Button */}
        <div className="flex w-full justify-end p-4">
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-[var(--accent-color)] text-white px-4 py-2 rounded-md hover:bg-opacity-90"
          >
            Create New Post
          </button>
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
                  style={{ backgroundImage: `url('${blog.blog_image}')` }}
                ></div>
                <div className="flex flex-col justify-between items-start h-full m-4">
                  <h3>{blog.blog_header}</h3>
                  <div className="h-16 overflow-hidden">
                    <p>{blog.blog_text}</p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <button
                      className="w-25 h-7 my-1 rounded-[5px] font-bold text-[#fff] text-[.8rem] cursor-pointer bg-[var(--accent-color)]"
                      onClick={() => handleBlogClick(blog.id)}
                    >
                      Read more
                    </button>
                    {currentUserId === blog.created_by_uuid && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditBlog(blog)}
                          className="bg-blue-500 h-7 text-white px-2 rounded cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteBlog(blog.id, blog.blog_image)
                          }
                          className="bg-red-500 h-7 text-white px-2 rounded cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
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
