var request = require("request").defaults({ encoding: null });

var fs = require('fs');
const path = require('path');
const { populateForm, isValidForm, readForm } = require('./personalize_scripts/form_management.js');
const { history, undoChanges, redoChanges , setInfo} = require('./personalize_scripts/undo_redo_management.js');




// Set the base path depending on the environment
let basePath =  path.join(__dirname, '..') // Adjust if // Corrected path for production

if (path.basename(basePath) == 'app.asar') {
  basePath = path.join(basePath, '..', 'casuafolio-react-app');
} else {
  basePath = path.join(basePath, 'casuafolio-react-app')
}
console.log(basePath)

const relativePathToPersonalizationConstants = path.join(basePath, 'src', "personalizationConstants.json");
let unsavedEventFoldersList = []; 
let unsavedImagesList = []; // a list of path.join(folder_name_of_addedImage, fileName)


let toBeDeletedFolderList = []; // a list of "toBeDeletedFolderList.push({ folderName: sectionInfo[index].folder_name, sectionInfo: sectionInfo, sectionId: sectionId, eventIndex: index, // Store index to potentially reorder or restore UI elements eventData: sectionInfo[index] // Optionally store the entire event data if needed for restoration });"
let toBeDeletedImageList = []; // a list of "toBeDeletedImageList.push({ path: event_and_image_names, galleryDivId: galleryDiv_of_addedImage.id, eventName: event_folder_name, imageName: imageName, isLogo: isLogo });"

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

function deleteMarkedFilesAndFolders() {
  // Delete marked images
  toBeDeletedImageList.forEach(imageObj => {
    deleteImageFile(imageObj.path);
  });

  // Delete marked folders
  toBeDeletedFolderList.forEach(deletedEventObj => {
    setTimeout(() => {
      removeFolder(deletedEventObj.folderName);// so here do the timout thing
    
      deletedEventObj.sectionInfo.splice(deletedEventObj.eventIndex, 1);
      createEventsSection(deletedEventObj.sectionInfo, deletedEventObj.sectionId);
    }, 500); // TODO: replace this timeout with promises and callbacks

  });

  // Reset lists
  toBeDeletedImageList = [];
  toBeDeletedFolderList = [];
}

function handleSubmit() {
  const info = readForm();
  let formValidationResult = isValidForm(info);
  if (formValidationResult.valid) {
    setInfo(info); // Set the new state
    history.save(); // Save the new state
    
    fs.writeFile(relativePathToPersonalizationConstants, JSON.stringify(info), (err) => {
      if (err) {
        alert("Error While Saving");
        console.error("Could not write to file", err);
        return;
      }
      alert("Successfully Saved :)");

      // delete marked files and folders upon successful save
      deleteMarkedFilesAndFolders();

      unsavedEventFoldersList = []; // Reset the list
      unsavedImagesList = []; // Reset the list
    });
  } else {
    alert("Saving Failed :(  \n\n".concat(formValidationResult.message));
  }
}


const relativePathTo_events_images = path.join(basePath,'public','events_images');
console.log(relativePathTo_events_images)
function rmUnsavedImagesList() {
  unsavedImagesList.forEach(unsavedImage => {
    let event_and_image_names =unsavedImage;
    alert(unsavedImage)
    deleteImageFile(event_and_image_names);
    });
};
function rmUnsavedEventFolders() {
  //alert(relativePathTo_events_images);
  unsavedEventFoldersList.forEach(unsavedFolderName => {
    //alert(unsavedFolderName);
    removeFolder(unsavedFolderName);
  });
  //alert("done");
}

// unsaved files get deleted on navigation
function deleteUnsavedFiles() {
  rmUnsavedImagesList(); 
  rmUnsavedEventFolders();
}

function revertImageDeletions() {
  toBeDeletedImageList.forEach(({ galleryDivId, eventName, imageName, isLogo }) => {
    const galleryDiv = document.getElementById(galleryDivId);
    if (galleryDiv) {
      createImageElement(galleryDiv, eventName, imageName, isLogo);
    } else {
      throw "this should not run!";
    }
  });

  toBeDeletedImageList = [];
}

function revertFolderDeletions() {
  // nothing is needed to be done here because sectionInfo is not modified until save is pressed

  toBeDeletedFolderList = []; // Reset the list after reverting
}


function onNavigatingBack() {
  console.log("Navigating back... Reverting unsaved file/folder deletions");

  // return the divs & reset list
  revertImageDeletions()

  revertFolderDeletions()



  // cleanup
  deleteUnsavedFiles();

  alert('Note: unsaved changes are lost!')
}




document.getElementById('save-changes-btn').addEventListener('click', handleSubmit);
document.getElementById('undoButton').addEventListener('click', undoChanges);
document.getElementById('redoButton').addEventListener('click', redoChanges);
document.getElementById('back-button').addEventListener('click', onNavigatingBack);

