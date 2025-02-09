import React, { useState } from "react";
import Image from "next/image";

const GameImageGallery = ({ thumbnail, additionalImages }) => {
  const [selectedImage, setSelectedImage] = useState(thumbnail);

  return (
    <div className="flex flex-col items-center">
      {/* Large Displayed Image */}
      <div className="mb-4 sm:mb-5 w-full max-w-[40rem]">
        <Image
          width={700}
          height={700}
          src={selectedImage}
          alt="Selected"
          className="w-full h-[12rem] sm:h-[15rem] md:h-[18rem] lg:h-[21rem] rounded-lg shadow-xl"
          style={{
            boxShadow: "0 20px 20px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 justify-center items-center md:gap-4 w-full max-w-[40rem] px-2">
        {[thumbnail, ...additionalImages].map((image, index) => (
          <div
            key={index}
            className={`relative h-12 w-16 md:w-20 md:h-20 rounded-md cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110 ${
              selectedImage === image
                ? "outline outline-3 outline-blue-600 scale-110"
                : ""
            }`}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameImageGallery;
