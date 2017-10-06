/*eslint-env node, es6*/
/*eslint no-console:1*/

const zip = require('zip-dir');
const fs = require('fs');

module.exports = (course, stepCallback) => {
  course.addModuleReport('zip');
  try {

    /* Checks if a directory exists or not. Used to determine if our
    extraction is done or still in progress, and to see if we already
    have a directory of that name before we extract. */
    function checkDirectory(filepath) {
      try {
        fs.statSync(filepath);
        return true;
      } catch (e) {
        return false;
      }
    }

    /* Checks to see if a directory already exists within
    our folder where we store unzipped courses. If it exists,
    then we add ' - Copy' to the name of the directory we'll
    unzip. Returns a string. If a copy already exists, it checks
    for that in the While loop. Same for a copy of a copy of ... etc.*/
    function setDirectoryName(filepath) {
      try {
        /* While it already exists, change the name of our filepath */
        while (checkDirectory(filepath)) {
          filepath = filepath.split('.zip')[0];
          filepath += ' - Copy.zip';
        }
        return filepath;
      } catch (e) {
        return filepath;
      }
    }

    /* Defines where we're going to put the zipped folder */
    course.info.zippedFilepath = setDirectoryName(
      `${course.info.zippedFilepath}\\${course.info.fileName}`
    );

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

  } catch (e) {
    /* If we have an error, throw it back up to its parent module.
    YOU MUST replace 'moduleName' with the name of this module. */
    stepCallback(e, course);
  }
};
