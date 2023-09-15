import React, { useState, useEffect } from "react";
import fs from "fs";
import path from "path";

function ImageCounter() {
  const [imageCount, setImageCount] = useState(-1);

  useEffect(() => {
    async function galleryImageCounter(pathToFolder) {
      try {
        const files = await fs.promises.readdir(pathToFolder);
        let count = 0;

        files.forEach((file) => {
          const filePath = path.join(pathToFolder, file);

          if (file.match(/^image\d+\.jpg$/) && file !== "image0.jpg") {
            count++;
          }
        });

        setImageCount(count);
      } catch (err) {
        console.error("Error reading folder:", err);
        setImageCount(-1);
      }
    }

    const folderPath = "public/about_images";
    galleryImageCounter(folderPath);
  }, []);

  return (
    <div>
      {imageCount >= 0 ? (
        <p>Number of event images: {imageCount}</p>
      ) : (
        <p>An error occurred while reading the folder.</p>
      )}
    </div>
  );
}

export default ImageCounter;
