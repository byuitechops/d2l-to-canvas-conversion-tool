/* Require any dependencies here */
const async = require('async'),
  unzip = require('./unzip.js'),
  indexCourse = require('./indexCourse.js'),
  nameTheCourse = require('./nameTheCourse.js');

/* Our main function, called by main.js*/
module.exports = (course, mainCallback) => {
  /* List child modules in order of of operation */
  const childModules = [
    async.constant(course),
    getCourseName,
    unzip,
    indexCourse
  ];

  async.waterfall(childModules, (err, resultCourse) => {
    if (err) {
      // If we have an error, send it up to main.js
      mainCallback(err, resultCourse);
    } else {
      // If successful, return the course to main.js
      console.log('Course successfully indexed.');
      mainCallback(null, resultCourse);
    }
  });

};
