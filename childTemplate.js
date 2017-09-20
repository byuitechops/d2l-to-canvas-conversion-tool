/* Put dependencies here */

module.exports = (course, stepCallback) => {
  try {
    /* Code Body */


    course.report.moduleLogs['moduleName'].changes.push('')
    stepCallback(null, course);
  } catch (e) {
    /* If we have an error, throw it back up to its parent module.
    YOU MUST replace "moduleName" with the name of this module. */
    stepCallback(new Error('moduleName'), course);
  }
};
