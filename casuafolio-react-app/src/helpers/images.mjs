import { readdir, rename } from "fs/promises";
import { dirname, join } from "path";

const imageExtensions = /\.(jpg|jpeg)$/i;
const imageBaseName = /^image[1-9]{1}[0-9]*\.jpg$/i;

/**
 * @description Reads every file in a folder that in the format "image{number}.jpg"
 * and returns them as an array of absolute file names.
 * @param {string} dirPath - The absolute path of the input folder.
 * @returns {string[]} - An array of all absolute image filenames
 * that are in the format "image{number}.jpg".
 */
export async function readImagesFromDir(dirPath) {
  const allFiles = await readdir(dirPath);

  const imageFiles = allFiles
    .filter((file) => {
      return imageBaseName.test(file);
    })
    .sort((a, b) => {
      const [numberA, numberB] = [
        parseInt(a.match(/\d+/)[0]),
        parseInt(b.match(/\d+/)[0]),
      ];
      return numberA - numberB;
    });

  return imageFiles.map((image) => join(dirPath, image));
}

/**
 * @description A function to rename any .jpg/.jpeg files in a folder to the format "image{number}.jpg".
 * @param {string} dirPath The absolute path of the input folder.
 * @returns {number} The number of renamed images in the folder.
 */
export async function renameImages(dirPath) {
  const allFiles = await readdir(dirPath);
  let startCount = allFiles
    .filter((file) => imageBaseName.test(file))
    .reduce((max, file) => {
      const number = parseInt(file.match(/\d+/)[0]);
      return number > max ? number : max;
    }, 0);

  const imageFiles = allFiles.reduce((res, file) => {
    if (
      imageExtensions.test(file) &&
      !file.includes("logo.png") &&
      !file.includes("image0.jpg") &&
      !imageBaseName.test(file)
    ) {
      res.push(join(dirPath, file));
    }
    return res;
  }, []);

  for (const image of imageFiles) {
    await rename(image, join(dirname(image), `image${++startCount}.jpg`));
  }

  return imageFiles.length;
}
