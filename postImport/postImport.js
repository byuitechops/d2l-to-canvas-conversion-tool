/* Require any dependencies here */
const asyncLib = require('async');
const insertFunction = require('../insertFunction.js');
const verify = require('../verify.js');
const agenda = require('../agenda.js');

/* Our main function, called by main.js */
module.exports = (course, mainCallback) => {
    course.addModuleReport('postImport');
    var childModules = insertFunction(agenda.postImport, verify);
    asyncLib.waterfall(
        [asyncLib.constant(course), ...childModules],
        (err, resultCourse) => {
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
