const { writeFile } = require('fs');
const { app, BrowserWindow, dialog, ipcRenderer, shell } = require('electron');

// Global states




function requestImage(folder_name_of_addedImage, galleryDivID_of_addedImage) {
  ipcRenderer.send('file-request', folder_name_of_addedImage, galleryDivID_of_addedImage);
}

//upon receiving a file, process accordingly
ipcRenderer.on('file', (event, file, folder_name_of_addedImage, galleryDivID_of_addedImage) => {
  console.log('obtained file from main process: ' + file);
  processNewImage(file, folder_name_of_addedImage, galleryDivID_of_addedImage)
});


  

