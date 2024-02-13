const { writeFile } = require('fs');
const { app, BrowserWindow, ipcRenderer, shell } = require('electron');
// Global states




function requestImage(folder_name_of_addedImage, galleryDivID_of_addedImage, isLogo) {
  ipcRenderer.send('image-file-request', folder_name_of_addedImage, galleryDivID_of_addedImage, isLogo);
}



  
ipcRenderer.on('image-file-received', (event, file, folderName, targetId, isLogo) => {
  console.log('Obtained file from main process: ' + file);

  const galleryDivID_of_addedImage = targetId;
  const folder_name_of_addedImage = folderName;
  processNewImage(file, folder_name_of_addedImage, galleryDivID_of_addedImage, isLogo)
  
});


function requestPDF(folderName) {
  ipcRenderer.send('pdf-file-request', folderName);
}

ipcRenderer.on('pdf-file-received', (event, file, folderName) => {
  console.log('Obtained PDF file from main process: ' + file);

  // Assuming processNewImage can handle PDF/PNG similarly to images, or you might need a new function
  processNewCV(file, folderName);
  setCV();
});