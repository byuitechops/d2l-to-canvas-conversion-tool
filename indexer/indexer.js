/* Require any dependencies here */
const async = require('async'),
// nameTheCourse = require('./nameTheCourse.js'),
  createCourseObj = require('./createCourseObj'),
  unzip = require('./unzip2.js'),
  // setInfo = require('./setInfo.js'),
  indexDirectory = require('./indexDirectory.js');
  zip = require('./zip.js');

/* Our main function, called by main.js*/
module.exports = (filePath, settings, mainCallback) => {
  /* List child modules in order of of operation */
  const childModules = [
    async.constant(filePath, settings),
    createCourseObj,
    //nameTheCourse,
    unzip,
    //setInfo,
    //indexDirectory,
    //zip
  ];

  async.waterfall(childModules, (err, resultCourse) => {
    if (err) {
      /* If we have an error, throw it back up to main.js */
      mainCallback(err, resultCourse);
    } else {
      /* If successful, head on to the next sub module */
      resultCourse.success(
        'indexer', 'Course successfully created and indexed.'
      );
      mainCallback(null, resultCourse);
    }
  });

};
