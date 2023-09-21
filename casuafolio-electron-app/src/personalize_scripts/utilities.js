const path = require('path');

const currentDir = __dirname;
const rootPath = path.resolve(currentDir, '..', '..', '..');
const relativePathToPersonalizationConstants = path.join(rootPath, 'casuafolio-react-app', 'src', 'personalizationConstants.json');

let sharedInfo = null;

function setInfo(info) {
  sharedInfo = info;
}

function getInfo() {
  return sharedInfo;
}

module.exports = {
  setInfo,
  getInfo,
  currentDir,
  rootPath,
  relativePathToPersonalizationConstants
};
