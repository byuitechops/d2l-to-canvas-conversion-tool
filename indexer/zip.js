/*eslint-env node, es6*/
/*eslint no-console:1*/

const zip = require('zip-dir');
const fs = require('fs');

module.exports = (course, stepCallback) => {
  course.addModuleReport('zip');
  course.success('zip', 'Report Module created for unzip');
  try {

    /* Checks if a directory exists or not. Used to determine if our
    extraction is done or still in progress, and to see if we already
    have a directory of that name before we extract. */
    function checkDirectory(filepath) {
      try {
        fs.statSync(filepath + '.zip');
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
          filepath += ' - Copy';
        }
        return filepath;
      } catch (e) {
        return filepath;
      }
    }

    /* Defines where we're going to put the zipped folder */
    course.info.zippedFilepath = setDirectoryName('./D2LReady/' +
      course.info.fileName);

    /* Zip that file right up */
    console.log(`ZIPPED FILE PATH: ${course.info.zippedFilepath}`);
    console.log(`UNZIPPED FILE PATH: ${course.info.unzippedFilepath}`);
    console.log(`CURR DIR: ${__dirname}`);

    zip("C:/Users/Danverde/Documents/d2l-to-canvas-conversion-tool/D2LProcessing/testFile", {
      saveTo: "C:/Users/Danverde/Documents/d2l-to-canvas-conversion-tool/D2LReady/testFile.zip"
    }, function (err, buffer) {
      if (err) {
        stepCallback(err, course);
        return;
      }
      course.success('zip', 'Course successfully zipped.');
      stepCallback(null, course);
    });


    /* On completion, return the course object back to its parent module. */
    /*var waitForUnzip = setInterval(() => {
      if (checkDirectory(course.info.zippedFilepath.match(/[\s\S]+(?=.zip)/)[0])) {
        clearInterval(waitForUnzip);
        zipFile.addLocalFolder(
          course.info.unzippedFilepath, course.info.zippedFilepath
        );
        console.log(zipFile);
        course.success('zip', 'Course successfully zipped.');
        stepCallback(null, course);
      }
    }, 100);*/

  } catch (e) {
    /* If we have an error, throw it back up to its parent module.
    YOU MUST replace "moduleName" with the name of this module. */
    stepCallback(e, course);
  }
};
