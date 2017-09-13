const main = require('../main.js');

exports.run = (returnCallback) => {
  main.setId('123');
  returnCallback();
};
