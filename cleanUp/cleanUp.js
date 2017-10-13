const removeFiles = require('./removeFiles.js');

module.exports = function (course, returnCallback) {
    course.addModuleReport('cleanUp');

  /* STEP LOGIC GOES HERE */
  removeFiles(course, (error, resultCourse) => {
      returnCallback();
  });

};
