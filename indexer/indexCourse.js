/* Put dependencies here */

module.exports = (course, stepCallback) => {
  try {

    /* SET CONTENT */
    /* Breaks down the course structure and saves it all, including
    each file's contents, into our massive course object. */
    function setContent(XML, callback) {
      // Say your prayers, this one is gonna hurt
      callback(null, XML);
    }

   

    /* This line must be included in every child module. Change "moduleName"
    to match the name of this module. The success message should be included
    for each item that is fixed/changed/altered/captainamerica'd. Please be
    specific in the message. */
    course.report.moduleLogs['indexCourse']
      .changes.push('Successfully indexed ' + course.info.courseName);

    // On completion, return the course object back to its parent module.
  } catch (e) {
    /* If we have an error, throw it back up to its parent module.
    YOU MUST replace "moduleName" with the name of this module. */
    e.location = 'indexCourse.js';
    stepCallback(e, course);
  }
};
