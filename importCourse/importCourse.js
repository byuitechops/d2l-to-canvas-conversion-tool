// CHILD MODULES - Modules used by this module to complete its task
const createCourse = require('./createCourse.js');
const uploadCourse = require('./uploadCourse.js');
const getMigrationIssues = require('./getMigrationIssues.js');
const insertFunction = require('../insertFunction.js');
const verify = require('../verify.js');

/* Require any dependencies here */
const async = require('async');

/* Our main function, called by main.js*/
module.exports = (course, mainCallback) => {

    course.addModuleReport('importCourse');

    /* List child modules in order of of operation */
    var childModules = [
        async.constant(course),
        createCourse,
        uploadCourse,
        getMigrationIssues
    ];

    if (course.settings.debug) {
        childModules = insertFunction(childModules, verify);
    }

    async.waterfall(childModules, (err, resultCourse) => {
        if (err) {
            // If we have an error, send it up to main.js
            mainCallback(err, resultCourse);
        } else {
            // If successful, return the course to main.js
            resultCourse.success(
                'importCourse', 'Import-Course processes completed successfully.'
            );
            mainCallback(null, resultCourse);
        }
    });
};
