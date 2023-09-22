const SimpleUndo = require('simple-undo');


let sharedInfo = null;

function setInfo(info) {
  sharedInfo = info;
}

function getInfo() {
  return sharedInfo;
}

function myObjectSerializer(done) {
  done(JSON.stringify(sharedInfo));
}

function myObjectUnserializer(serialized) {
  info = JSON.parse(serialized);
  setInfo(info); // Set the newly deserialized info
  populateForm(info);  // Repopulate the form based on the new state
}

const history = new SimpleUndo({
  maxLength: 10,
  provider: myObjectSerializer
});

// Undo Functionality
function undoChanges() {
  if (history.count() > 1) {
    history.undo(myObjectUnserializer);
  }
}

// Redo Functionality
function redoChanges() {
  if (history.count() > 1) {
    history.redo(myObjectUnserializer);
  }
}

module.exports = {
  history,
  undoChanges,
  redoChanges,
  setInfo,
  getInfo
};
