var request = require("request").defaults({ encoding: null });

var fs = require('fs');
const path = require('path');
const { populateForm, isValidForm, readForm } = require('./personalize_scripts/form_management');
const { history, undoChanges, redoChanges , setInfo} = require('./personalize_scripts/undo_redo_management');

const relativePathToPersonalizationConstants = path.join("casuafolio-react-app", "src", "personalizationConstants.json");
let unsavedEventFoldersList = []; 
let unsavedImagesList = []; // a list of path.join(folder_name_of_addedImage, fileName)

fs.readFile(relativePathToPersonalizationConstants, 'utf8', (err, data) => {
  if (err) {
    console.error("Could not read file", err);
    return;
  }
  const info = JSON.parse(data);
  setInfo(info); // Correctly set the initial info state
  history.save(); // Save the initial state
  populateForm(info);
});

function handleSubmit() {
  const info = readForm();
  if (isValidForm(info).valid) {
    setInfo(info); // Set the new state
    history.save(); // Save the new state
    
    fs.writeFile(relativePathToPersonalizationConstants, JSON.stringify(info), (err) => {
      if (err) {
        alert("Error While Saving");
        console.error("Could not write to file", err);
        return;
      }
      alert("Successfully Saved :)");
      unsavedEventFoldersList = []; // all events were saved, so reset the list
    });
  } else {
    alert("Saving Failed :(");
  }
};
const relativePathTo_events_images = path.join("casuafolio-react-app", "public", "events_images");
function rmUnsavedImagesList() {
  unsavedImagesList.forEach(unsavedImage => {
    let event_and_image_names = path.join(relativePathTo_events_images, unsavedImage);
    deleteImageFile(event_and_image_names);
    });
};
function rmUnsavedEventFolders() {
  //alert(relativePathTo_events_images);
  unsavedEventFoldersList.forEach(unsavedFolderName => {
    let folderPath = path.join(relativePathTo_events_images, unsavedFolderName);
    //alert(unsavedFolderName);
    removeFolder(unsavedFolderName);
  });
  //alert("done");
}

function deleteUnsavedFiles() {
  rmUnsavedImagesList();
  rmUnsavedEventFolders();
}



document.getElementById('save-changes-btn').addEventListener('click', handleSubmit);
document.getElementById('undoButton').addEventListener('click', undoChanges);
document.getElementById('redoButton').addEventListener('click', redoChanges);
document.getElementById('back-button').addEventListener('click', deleteUnsavedFiles);

