/* Put dependencies here */

module.exports = (course, stepCallback) => {
  try {
    /*create the module object so that we can access it later as needed*/
    course.report.moduleLogs.moduleName = {
      fatalErrs: [],
      errors: [],
      changes: []
    };

    /* This line must be included in every child module. Change "moduleName"
    to match the name of this module. The success message should be included
    for each item that is fixed/changed/altered/captainamerica'd. Please be
    specific in the message. */

    course.report.moduleLogs.indexer
      .changes.push('childTemplate successfully ...');

    // On completion, return the course object back to its parent module.
    stepCallback(null, course);
  } catch (e) {
    /* If we have an error, throw it back up to its parent module.
    YOU MUST replace "moduleName" with the name of this module. */
    e.location = 'moduleName';
    stepCallback(e, course);
  }
};
