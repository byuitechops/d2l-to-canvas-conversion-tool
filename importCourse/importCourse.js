
module.exports = (callback) => {
  // CHILD MODULES - Modules used by this module to complete its task
  const createCourse = require('./importCourse/createCourse.js');
  const uploadCourse = require('./importCourse/uploadCourse.js');
  const getMigrationIssues = require('./importCourse/getMigrationIssues.js');
  const waterfall = require('async').waterfall;

  var childModules = [
    //createCourse,
    //uploadCourse,
    //getMigrationIssues
  ];

  waterfall(childModules, (err, result) => {
    // If we have an error anywhere in the process, tell us here
    if (err) {
      console.log(err);
      // Let us know when the process is completely finished
    } else {
      console.log('Step 3: Import Course - Complete');
      callback();
    }
  });
};
