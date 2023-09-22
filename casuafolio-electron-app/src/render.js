const { writeFile } = require('fs');
const { app, BrowserWindow, dialog, ipcRenderer } = require('electron');

// Global states


const fs = require('fs');
const path = require('path');

// ...



const buildBtn = document.getElementById('buildBtn');
buildBtn.onclick = e => {
  const currentDir = __dirname;
  //console.log("Current Directory: ", currentDir);

  // Navigate back to the common root directory 'casuafolio'
  const rootPath = path.resolve(currentDir, '..', '..'); // contents of casuafolio repo
  //console.log("Root Directory: ", rootPath);

  // Navigate down into the React app's src folder
  const relativePathToPersonalizationConstants = path.join(rootPath, 'casuafolio-react-app', 'src', 'personalizationConstants.js');
  //console.log("Trying to read from: ", relativePathToPersonalizationConstants);

  fs.readFile(relativePathToPersonalizationConstants, 'utf8', (err, data) => {
    if (err) {
      console.error("Could not read file", err);
      return;
    }
    console.log("File contents:", data);
  });
};







const livePreviewBtn = document.getElementById('livePreviewBtn');
livePreviewBtn.onclick = e => {
  //  livePreviewBtn.innerText = 'Recording';
  console.log(2)
};

const personalizeBtn = document.getElementById('personalizeBtn');
personalizeBtn.onclick = e => {
  //  personalizeBtn.innerText = 'Recording';
  //console.log(3)
};



function requestImage() {
  ipcRenderer.send('file-request');
}

//upon receiving a file, process accordingly
ipcRenderer.on('file', (event, file) => {
  console.log('obtained file from main process: ' + file);
});


  