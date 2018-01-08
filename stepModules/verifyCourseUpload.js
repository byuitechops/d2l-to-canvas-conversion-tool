const canvas = require('canvas-wrapper');
const asyncLib = require('async');

module.exports = (course, stepCallback) => {
    course.addModuleReport('verify-course-upload');

    /* Options for our "retry" function */
    var options = {
        times: 15,
        interval: 2000
    };

    /* Checks if modules are in place */
    function checkModules(callback) {
        /* Get modules from course */
        canvas.get(`/api/v1/courses/${course.info.canvasOU}/modules`, (err, modules) => {
            if (err) {
                course.throwErr('verify-course-upload', err);
                callback(err);
            } else {
                /* If we get back an empty array or not */
                if (modules.length > 0) {
                    course.success('verify-course-upload', `Course has finished unpacking.`);
                    callback(null, modules);
                } else {
                    course.success('verify-course-upload', `Course has not finished unpacking. Checking again.`);
                    callback(new Error('Blank array received'));
                }
            }
        });
    }

    asyncLib.retry(options, checkModules, (err, result) => {
        stepCallback(null, course);
    });

}
