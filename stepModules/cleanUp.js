/*eslint-env node, es6*/
const asyncLib = require('async');
const insertFunction = require('../insertFunction.js');
const verify = require('course-object-verifier');
const agenda = require('../agenda.js');

module.exports = (course, mainCallback) => {
    course.addModuleReport('cleanUp');
    var childModules = insertFunction(agenda.cleanUp, verify);
    asyncLib.waterfall(
        [asyncLib.constant(course), ...childModules],
        (err, resultCourse) => {
        if (err) {
            mainCallback(err, resultCourse);
        } else {
            resultCourse.success(
                'cleanUp', 'CleanUp processes completed successfully.'
            );
            mainCallback(null, resultCourse);
        }
    });
};
