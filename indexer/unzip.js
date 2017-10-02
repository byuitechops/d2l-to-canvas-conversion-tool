const decompress = require('decompress');
const fs = require('fs');

module.exports = (course, stepCallback) => {
  try {
    /* Gimme that module report */
    course.addModuleReport('unzip');
    course.success('unzip', 'Report Module created for unzip');

    /* Checks if a directory exists or not. Used to determine if our
    extraction is done or still in progress, and to see if we already
    have a directory of that name before we extract. */
    function checkDirectory(filepath) {
      return fs.statSync(filepath).isDirectory();
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
          filepath += ' - Copy';
        }
        return filepath;
      } catch (e) {
        return filepath;
      }
    }

    /* Set the filepath we will be unzipping to */
    course.info.unzippedFilepath = setDirectoryName(
      `./D2LProcessing/${course.info.originalFilepath.split('.zip')[0]}`
    );

    /* Unzip the course into a new folder */
    decompress(course.info.originalFilepath, course.info.unzippedFilepath)
    .then((files) => {
      course.success('unzip', 'Course successfully unzipped');
      stepCallback(null, course);
    }, (promiseError) => {
      stepCallback(promiseError, course);
    });

  } catch (e) {
    course.throwErr('unzip', e);
    stepCallback(e, course);
  }
};
