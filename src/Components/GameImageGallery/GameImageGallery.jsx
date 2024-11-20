import React, { useState } from "react";
import styles from "./ImageGallery.module.css"; // CSS Module for styling
import Image from "next/image";

const GameImageGallery = ({ thumbnail, additionalImages }) => {
  const [selectedImage, setSelectedImage] = useState(thumbnail);

  return (
    <div className={styles.galleryContainer}>
      {/* Large Displayed Image */}
      <div className={styles.mainImageContainer}>
        <Image
          width={700}
          height={700}
          src={selectedImage}
          alt="Selected"
          className={styles.mainImage}
        />
      </div>

      {/* Thumbnails */}
      <div className={styles.thumbnailContainer}>
        {[thumbnail, ...additionalImages].map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`${styles.thumbnail} ${
              selectedImage === image ? styles.selectedThumbnail : ""
            }`}
            onClick={() => setSelectedImage(image)}
            width={300}
            height={300}
          />
        ))}
      </div>
    </div>
  );
};

export default GameImageGallery;
