/*eslint-env node, es6*/
/*eslint no-unused-vars:1*/

/* Part of clean up. This module deletes the course
 out of canvas if a fatal error was thrown */
const canvas = require('../canvas.js');

module.exports = (course, stepCallback) => {
    course.addModuleReport('deleteCourse');

    /* Only delete when flagged for removal and canvasOU exists */
    if (course.settings.deleteCourse === true && course.info.canvasOU != undefined) {

        var url = `/api/v1/courses/${course.info.canvasOU}?event=delete`;
        canvas.delete(url, (err, body) => {
            if (err) {
                course.throwErr('deleteCourse', err);
                return;
            }
            course.success('deleteCourse', 'deleteCourse successfully deleted the course from Canvas');
            stepCallback(null, course);
        });
    } else if (course.info.canvasOU === undefined) {
        course.throwWarning('deleteCourse', 'Canvas OU was not defined. Was the course created? (ignore if you skipped course upload)');
    } else {
        course.success('deleteCourse', 'deleteCourse determined the course did not need to be deleted.');
        stepCallback(null, course);
        return;
    }
}
