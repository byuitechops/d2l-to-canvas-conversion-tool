/*eslint-env node, es6*/

const Zip = require('adm-zip');
const fs = require('fs');

module.exports = (course, stepCallback) => {
  course.addModuleReport('zip');
  course.success('zip', 'Report Module created for unzip');
  try {

    /* Creates an instance of adm-zip's class in memory */
    var zipFile = new Zip();

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
      course.info.fileName) + '.zip';

    /* Zip that file right up */
    zipFile.writeZip(course.info.zippedFilepath);

    /* Adds our now-altered course folder we originally unzipped into
    our zip instance in memory, so we can zip it up. */
    console.log('zippedFilepath', course.info.zippedFilepath);
    console.log('unzippedFilepath', course.info.unzippedFilepath);
    zipFile.addLocalFolder(
      course.info.unzippedFilepath, course.info.zippedFilepath
    );

    console.log('zipFile', zipFile);





    /* On completion, return the course object back to its parent module. */
    var waitForUnzip = setInterval(() => {
      if (checkDirectory(course.info.zippedFilepath.match(/[\s\S]+(?=.zip)/)[0])) {
        clearInterval(waitForUnzip);
        course.success('zip', 'Course successfully zipped.');
        stepCallback(null, course);
      }
    }, 100);



  } catch (e) {
    /* If we have an error, throw it back up to its parent module.
    YOU MUST replace "moduleName" with the name of this module. */
    stepCallback(e, course);
  }
};
