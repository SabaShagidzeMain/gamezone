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
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError("");

    let imageUrl = userData?.user_image;

    if (image) {
      // Upload the image directly to the 'users' bucket (no 'avatars' folder)
      const filePath = `${image.name}`;

      // Upload the image to the 'users' bucket
      const { data, error: uploadError } = await supabase.storage
        .from("users")
        .upload(filePath, image, { upsert: true });

      if (uploadError) {
        setError(`Failed to upload image: ${uploadError.message}`);
        setLoading(false);
        return;
      }

      // Construct the image URL
      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/users/${filePath}`;
    }

    // Update the user profile with the new image URL
    const { error: updateError } = await supabase
      .from("users")
      .update({ username, user_image: imageUrl })
      .eq("id", userData.id);

    if (updateError) {
      setError("Failed to update profile");
    } else {
      onUpdate();
      onClose();
    }

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
