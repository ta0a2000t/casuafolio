const fs = require('fs');
const path = require('path');
const { populateForm, isValidForm, readForm} = require('./personalize_scripts/form_management');
const { history, undoChanges, redoChanges} = require('./personalize_scripts/undo_redo_management');
const { relativePathToPersonalizationConstants } = require('./personalize_scripts/utilities');
const { setInfo } = require('./personalize_scripts/utilities');


fs.readFile(relativePathToPersonalizationConstants, 'utf8', (err, data) => {
  if (err) {
    console.error("Could not read file", err);
    return;
  }
  info = JSON.parse(data);
  history.save();
  populateForm(info);
});

function handleSubmit() {
  let info = readForm();
  const validationResult = isValidForm(info);
  if (validationResult.valid === true) {
    history.save();

    // Perform file write operation
    fs.writeFile(relativePathToPersonalizationConstants, JSON.stringify(info), (err) => {
      if (err) {
        alert("Error While Saving")
        console.error("Could not write to file", err);
        return;
      }

      alert("Successfully Saved :) ");
    });
  } else {
    alert("Saving Failed :(  ".concat(validationResult.message))
  }
}

document.getElementById('save-changes-btn').addEventListener('click', handleSubmit)

document.getElementById('undoButton').addEventListener('click', undoChanges);
document.getElementById('redoButton').addEventListener('click', redoChanges); 
