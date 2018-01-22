const canvas = require('canvas-wrapper');
const asyncLib = require('async');

module.exports = (course, stepCallback) => {

    /* Options for our "retry" function */
    var options = {
        times: 15,
        interval: 5000
    };

    var manifest = course.content.find(file => {
        return file.name == 'imsmanifest.xml';
    });

    var moduleCount = manifest.dom('organization>item').length;

    /* Checks if modules are in place */
    function checkModules(callback) {
        /* Get modules from course */
        canvas.get(`/api/v1/courses/${course.info.canvasOU}/modules`, (err, modules) => {
            if (err) {
                course.error(err);
                callback(err);
            } else {
                /* If we get back an empty array or not */
                if (modules.length != moduleCount) {
                    course.message(`Course has finished unpacking.`);
                    callback(null, modules);
                } else {
                    course.message(`Course has not finished unpacking. Checking again.`);
                    callback(new Error('Blank array received'));
                }
            }
        });
    }

    asyncLib.retry(options, checkModules, (err, result) => {
        stepCallback(null, course);
    });

}
