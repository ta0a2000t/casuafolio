const SimpleUndo = require('simple-undo');
const { getInfo } = require('./utilities');

const info = getInfo();


function myObjectSerializer(done) {
  done(JSON.stringify(info));
}

function myObjectUnserializer(serialized) {
  info2 = JSON.parse(serialized);
  populateForm(info2);  // Repopulate the form based on the new state
}

const history = new SimpleUndo({
  maxLength: 10,
  provider: myObjectSerializer
});

// Undo Functionality
function undoChanges() {
  if (history.count() > 1 ) {
      history.undo(myObjectUnserializer);
  }
}

// Redo Functionality
function redoChanges() {
  if (history.count() > 1 ) {
      history.redo(myObjectUnserializer);
  }
}

module.exports = {
  history,
  undoChanges,
  redoChanges
};
