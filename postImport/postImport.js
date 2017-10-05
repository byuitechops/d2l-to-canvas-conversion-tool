/* Require any dependencies here */
const async = require('async');

/* Our main function, called by main.js*/
module.exports = (course, mainCallback) => {

  /* List child modules in order of of operation */
  const childModules = [
    async.constant(course),
  ];

  async.waterfall(childModules, (err, resultCourse) => {
    if (err) {
      // If we have an error, send it up to main.js
      resultCourse.throwFatalErr('postImport', err);
      mainCallback(err, resultCourse);
    } else {
      // If successful, return the course to main.js
      resultCourse.success(
        'postImport', 'Post-Import processes completed successfully.'
      );
      mainCallback(null, resultCourse);
    }
  });
};
