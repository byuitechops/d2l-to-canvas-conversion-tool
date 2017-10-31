/*eslint-env node, es6*/

/* Require any dependencies here */
const asyncLib = require('async');
const insertFunction = require('../insertFunction.js');
const verify = require('course-object-verifier');
const agenda = require('../agenda.js');

/* Our main function, called by main.js */
module.exports = (course, mainCallback) => {
    course.addModuleReport('postImport');
    var childModules = [
        asyncLib.constant(course),
        ...insertFunction(agenda.postImport, verify)
    ];
    asyncLib.waterfall(childModules, (err, resultCourse) => {
        if (err) {
            mainCallback(err, resultCourse);
        } else {
            resultCourse.success(
                'postImport', 'Post-Import processes completed successfully.'
            );
            mainCallback(null, resultCourse);
        }
    });
};
