"use client";

import { useState } from "react";
import { supabase } from "@/utilities/supabase/supabase";

const EditProfile = ({ userData, onClose, onUpdate }) => {
  const [username, setUsername] = useState(userData?.username || "");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
      console.log("Image selected:", e.target.files[0]); // Debugging: Log selected file
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError("");

    // Get the current session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setError("User is not authenticated.");
      setLoading(false);
      return;
    }

    // Ensure the session user is the same as the userData.id
    if (userData.id !== session.user.id) {
      setError("You can only update your own profile.");
      setLoading(false);
      return;
    }

    let imageUrl = userData?.user_image;

    // If there's an existing image, delete it first
    if (image && userData?.user_image) {
      const { error: deleteError } = await supabase.storage
        .from("users_avatars") // Bucket name
        .remove([userData.user_image]); // Delete the previous image file

      if (deleteError) {
        setError(`Failed to delete old image: ${deleteError.message}`);
        setLoading(false);
        return;
      }
    }

    if (image) {
      const fileExt = image.name.split(".").pop();
      const fileName = `${session.user.id}-avatar-${Date.now()}.${fileExt}`; // Added timestamp for uniqueness

      // Upload new image to the 'users_avatars' bucket
      const { data, error: uploadError } = await supabase.storage
        .from("users_avatars")
        .upload(`avatars/${fileName}`, image);

      if (uploadError) {
        setError(`Failed to upload image: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/users_avatars/${data.path}`;
    }

    // Now use the same UUID (session.user.id) for updating the user
    const { error: updateError } = await supabase
      .from("users")
      .update({ username, user_image: imageUrl })
      .eq("id", session.user.id)
      .select()
      .single();

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    onUpdate();
    onClose();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          placeholder="Username"
        />
        <input type="file" onChange={handleImageChange} className="mb-4" />
        <div className="flex justify-between">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
