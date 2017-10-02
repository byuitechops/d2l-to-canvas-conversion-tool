const Zip = require('adm-zip');
const fs = require('fs');

module.exports = (course, stepCallback) => {
  console.log("unzip");
  course.addModuleReport('unzip');
  course.success('unzip', 'Report Module created for unzip');
  try {

    // FOR TESTING
    // course.info.originalFilepath = './test';
    course.info.fileName = 'TestCourse';

    /* Creates an instance of adm-zip's read-in file, so we can
    access adm-zip's functions (like unzipping!) */
    var zipFile = new Zip(course.info.originalFilepath);

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

    /* Defines where we're going to unzip the file */
    course.info.unzippedFilepath = setDirectoryName('./D2LProcessing/' +
      course.info.fileName);

    /* Extracts the zip into our D2LReady folder. Changing the second
    parameter to true will have it overwrite any existing files in the
    directory it creates. We prefer false. */
    zipFile.extractAllTo(course.info.unzippedFilepath, false);

    /* This line must be included in every child module. Change "moduleName"
    to match the name of this module. The success message should be included
    for each item that is fixed/changed/altered/captainamerica'd. Please be
    specific in the message. */
    course.success('unzip', 'Course successfully unzipped');
    /* On completion, return the course object back to its parent module. */
    var waitForUnzip = setInterval(() => {
      if (checkDirectory(course.info.unzippedFilepath)) {
        clearInterval(waitForUnzip);
        stepCallback(null, course);
      }
    }, 100);
  } catch (e) {
    /* If we have an error, throw it back up to its parent module.
    YOU MUST replace "moduleName" with the name of this module. */
    stepCallback(e, course);
  }
};
