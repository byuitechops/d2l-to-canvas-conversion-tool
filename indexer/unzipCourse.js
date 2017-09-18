const Zip = require('adm-zip');
const main = require('../main.js');

module.exports = (callback) => {
  var zipFile = new Zip('./D2LOriginal/default.zip');
  zipFile.extractAllTo('./D2LReady/default.zip', false);
  console.log('Course Unzipped');
  callback();
};
