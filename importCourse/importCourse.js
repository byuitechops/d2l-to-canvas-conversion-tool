exports.courseid = 235234;

exports.run = (returnCallback) => {

  // CHILD MODULES
  const createCourse = require('./createCourse.js');
  const uploadCourse = require('./uploadCourse.js');
  const async = require('async');

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
      console.log('error');
      console.log(err);
      // Let us know when the process is completely finished
    } else {
      console.log('Step 3: Import Course - Complete');
      returnCallback();
    }
  });
};
