/*eslint-env node, es6*/

/* Put dependencies here */
var classes = require('./classes/Course.js');

module.exports = (filePath, settings, stepCallback) => {
  try {

    var course = new Course(filePath, settings);

    stepCallback(null, course);
  } catch (e) {

    /* How to throw a non-fatal error */
    course.throwErr('createCourseObj', e);
    stepCallback(e, 'Failed to create course object.');
  }
};
