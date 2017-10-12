/* Require any dependencies here */
const async = require('async');
const writeCourse = require('./writeCourse.js');
const zip = require('./zip.js');
// Fix module...
// Fix module...
// Fix module...

/* Our main function, called by main.js*/
module.exports = (course, mainCallback) => {
  course.addModuleReport('preImport');

  /* List child modules in order of of operation */
  const childModules = [
    async.constant(course),
    writeCourse,
    zip
  ];

  async.waterfall(childModules, (err, resultCourse) => {
    if (err) {
      // If we have an error, send it up to main.js
      mainCallback(err, resultCourse);
    } else {
      // If successful, return the course to main.js
      resultCourse.success(
        'preImport', 'Pre-Import processes completed successfully.'
      );
      mainCallback(null, resultCourse);
    }
  });

};
