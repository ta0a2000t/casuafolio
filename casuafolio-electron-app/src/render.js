const { writeFile } = require('fs');
const { app, BrowserWindow, dialog, ipcRenderer, shell } = require('electron');

// Global states




function requestImage(folder_name_of_addedImage, galleryDivID_of_addedImage, isLogo) {
  ipcRenderer.send('file-request', folder_name_of_addedImage, galleryDivID_of_addedImage, isLogo);
}



  
ipcRenderer.on('file', (event, file, folderName, targetId, isLogo) => {
  console.log('Obtained file from main process: ' + file);

  const galleryDivID_of_addedImage = targetId;
  const folder_name_of_addedImage = folderName;
  processNewImage(file, folder_name_of_addedImage, galleryDivID_of_addedImage, isLogo)
  
});

