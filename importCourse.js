// NPM MODULES
const async = require('async');

// CHILD MODULES - Modules used by this module to complete its task
const createCourse = require('./importCourse/createCourse.js');
const uploadCourse = require('./importCourse/uploadCourse.js');

module.exports = (returnCallback) => {

  var childModules = [
    createCourse,
    uploadCourse
  ];

  async.eachLimit(childModules, 1, (childModule, childCallback) => {
    // Fire off the module's run function
    childModule.run(() => {
      // When the module's run is complete, it runs this function
      childCallback();
    });
  }, (err) => {
    // If we have an error anywhere in the process, tell us here
    if (err) {
      console.log(err);
      // Let us know when the process is completely finished
    } else {
      console.log('Step 3: Import Course - Complete');
      returnCallback();
    }
  });
};
