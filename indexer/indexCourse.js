/* Put dependencies here */
const fs = require('fs');

module.exports = (course, stepCallback) => {
  try {

    // Use fs to read entire course structure

    /* This line must be included in every child module. Change "moduleName"
    to match the name of this module. The success message should be included
    for each item that is fixed/changed/altered/captainamerica'd. Please be
    specific in the message. */
    course.report.moduleLogs['indexCourse']
    .changes.push('Successfully indexed ' + course.info.courseName);

    // On completion, return the course object back to its parent module.
    stepCallback(null, course);
  } catch (e) {
    /* If we have an error, throw it back up to its parent module.
    YOU MUST replace "moduleName" with the name of this module. */
    stepCallback(new Error('indexCourse'), course);
  }
};
