import React, { Component } from "react";
const fs = require("fs");
const path = require("path");

class ImageCounter extends Component {
  gallery_image_counter(pathToFolder) {
    try {
      const files = fs.readdirSync(pathToFolder);
      let count = 0;

      files.forEach((file) => {
        const filePath = path.join(pathToFolder, file);

        if (file.match(/^image\d+\.jpg$/) && file !== "image0.jpg") {
          count++;
        }
      });

      return count;
    } catch (err) {
      console.error("Error reading folder:", err);
      return -1;
    }
  }

  render() {
    const folderPath = "public/about_images";
    const imageCount = this.gallery_image_counter(folderPath);

    if (imageCount >= 0) {
      return (
        <div>
          <p>Number of event images: {imageCount}</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>An error occurred while reading the folder.</p>
        </div>
      );
    }
  }
}

export default ImageCounter;
