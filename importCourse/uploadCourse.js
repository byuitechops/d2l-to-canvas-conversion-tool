const main = require('../main.js');

exports.run = (returnCallback) => {
  console.log(main.getId());
  returnCallback();
};
