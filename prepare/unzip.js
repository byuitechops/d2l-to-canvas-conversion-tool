/*eslint-env node, es6*/
/*eslint no-unused-vars: 1*/

const decompress = require('decompress');

module.exports = (course, stepCallback) => {
  try {
    /* Gimme that module report */
    course.addModuleReport('unzip');
    /* Unzip the course into a new folder */
    decompress(course.info.originalFilepath, course.info.unzippedFilepath)
    .then((files) => {
      course.success('unzip', 'Course successfully unzipped');
      stepCallback(null, course);
    }, (promiseError) => {
      course.throwFatalErr('unzip', promiseError);
      stepCallback(promiseError, course);
  });

  } catch (e) {
    course.throwErr('unzip', e);
    stepCallback(e, course);
  }
};
