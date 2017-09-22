/* Put dependencies here */

module.exports = (course, stepCallback) => {
    try {
        /*create the module object so that we can access it later as needed*/
        course.report.moduleLogs['moduleName'] = {
            fatalErrs: [],
            errors: [],
            changes: []
        };

        /* Code Body */

        course.report.moduleLogs['moduleName'].changes.push('');
        stepCallback(null, course);
    } catch (e) {
        /* If we have an error, throw it back up to its parent module.
        YOU MUST replace "moduleName" with the name of this module. */
        e.location = "moduleName";
        stepCallback(e, course);
    }
};
