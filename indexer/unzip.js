const Zip = require('adm-zip');

module.exports = (course, stepCallback) => {
  try {
    /* Code Body */

    var zipFile = new Zip(course.info.originalFilepath);
    // DOES ADM ZIP OVERWITE STUFF? HOW DOES WORK?
    zipFile.extractAllTo('../D2LReady/' + course.info.fileName, false);

    /* This line must be included in every child module. Change "moduleName"
    to match the name of this module. The success message should be included
    for each item that is fixed/changed/altered/captainamerica'd. Please be
    specific in the message. */
    course.report.moduleLogs['unzip'].changes.push('Successly unzipped' +
                                                      course.info.fileName);

    // On completion, return the course object back to its parent module.
    stepCallback(null, course);
  } catch (e) {
    /* If we have an error, throw it back up to its parent module.
    YOU MUST replace "moduleName" with the name of this module. */
    stepCallback(new Error('unzip'), course);
  }
};
