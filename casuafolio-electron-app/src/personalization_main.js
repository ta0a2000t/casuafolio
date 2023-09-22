const fs = require('fs');
const path = require('path');
const { populateForm, isValidForm, readForm } = require('./personalize_scripts/form_management');
const { history, undoChanges, redoChanges , setInfo} = require('./personalize_scripts/undo_redo_management');

const relativePathToPersonalizationConstants = path.join("casuafolio-react-app", "src", "personalizationConstants.json");

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
    });
  } else {
    alert("Saving Failed :(");
  }
}

document.getElementById('save-changes-btn').addEventListener('click', handleSubmit);
document.getElementById('undoButton').addEventListener('click', undoChanges);
document.getElementById('redoButton').addEventListener('click', redoChanges);
