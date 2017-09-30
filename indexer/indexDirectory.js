var courseTemp = require('../courseTemplate.js');

/* Put dependencies here */
const fs = require('fs'),
  async = require('async');

module.exports = (course, stepCallback) => {
  try {

  } catch (e) {
    /* If we have an error, throw it back up to its parent module.
    YOU MUST replace "moduleName" with the name of this module. */
    e.location = 'indexCourse.js';
    stepCallback(e, course);
  }
};

module.exports(courseTemp, function(err, course) {
  //console.log(course);
  console.log(course.content.files);
  //console.log(course.content.dirs);
});
