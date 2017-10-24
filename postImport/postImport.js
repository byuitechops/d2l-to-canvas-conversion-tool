/* Require any dependencies here */
const async = require('async');
const insertFunction = require('../insertFunction.js');
const verify = require('../verify.js');
const setSyllabus = require('set-syllabus');

/* Our main function, called by main.js*/
module.exports = (course, mainCallback) => {
    course.addModuleReport('postImport');

    /* List child modules in order of of operation */
    var childModules = [
        async.constant(course),
        setSyllabus
    ];

    childModules = insertFunction(childModules, verify);

    async.waterfall(childModules, (err, resultCourse) => {
        if (err) {
            // If we have an error, send it up to main.js
            mainCallback(err, resultCourse);
        } else {
            // If successful, return the course to main.js
            resultCourse.success(
                'postImport', 'Post-Import processes completed successfully.'
            );
            mainCallback(null, resultCourse);
        }
    });
};
