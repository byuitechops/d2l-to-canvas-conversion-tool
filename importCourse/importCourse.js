// CHILD MODULES - Modules used by this module to complete its task
const asyncLib = require('async');
const insertFunction = require('../insertFunction.js');
const verify = require('../verify.js');
const agenda = require('../agenda.js');

/* Require any dependencies here */
const async = require('async');

/* Our main function, called by main.js*/
module.exports = (course, mainCallback) => {
    course.addModuleReport('importCourse');
    var childModules = insertFunction(agenda.importCourse, verify);
    asyncLib.waterfall(
        [asyncLib.constant(course), ...childModules],
        (err, resultCourse) => {
        if (err) {
            mainCallback(err, resultCourse);
        } else {
            resultCourse.success(
                'importCourse', 'Import Course processes completed successfully.'
            );
            mainCallback(null, resultCourse);
        }
    });
};
