/*eslint-env node, es6*/
/*eslint no-console:1*/

const zip = require('zip-dir');
const fs = require('fs');

module.exports = (course, stepCallback) => {
    course.addModuleReport('zip');

    /* Zip that file right up */
    zip(course.info.unzippedFilepath, {
      saveTo: course.info.zippedFilepath
    }, function(err, buffer) {
      if (err) {
        stepCallback(err, course);
        return;
      }
      course.success('zip', 'Course successfully zipped.');
      stepCallback(null, course);
    });
};
