/*eslint-env node, es6*/

/* DEPENDENCIES */
const async = require('async');
const verify = require('./verify.js');
const insertFunction = require('./insertFunction.js');

/* STEP MODULES */
const prepare = require('./prepare/preparation.js');
const preImport = require('./preImport/preImport.js');
const importCourse = require('./importCourse/importCourse.js');
const postImport = require('./postImport/postImport.js');
const cleanUp = require('./cleanUp/cleanUp.js');

module.exports = (settings, finalCallback) => {

    /* STEP MODULES ARRAY */
    /* This array is where each step module's function is stored
    for the async waterfall below. Each of these functions contains
    a main step in the process of converting a course.*/

    var stepModules = [
      async.constant('TestFile 101.zip', settings),
      prepare,
      preImport,
      importCourse,
      postImport
    ];

    stepModules = insertFunction(stepModules, verify);

    /* Runs through each Step Module one by one */
    async.waterfall(stepModules, (err, resultCourse) => {
        /* Only fatal errors make it to this point.
         All others are just reported where they happen. */
        if (err) {
            resultCourse.throwFatalErr('main', err);
            
            /* let deleteCourse know it needs to remove the course*/
            resultCourse.settings.deleteCourse = true;
            cleanUp(resultCourse, (cleanUpErr) => {
                if (cleanUpErr) {
                    resultCourse.throwFatalErr('main', cleanUpErr);
                }
                finalCallback(err, resultCourse);
            });
        } else {
            cleanUp(resultCourse, () => {
                resultCourse.success('cleanUp', 'Cleanup process complete');
                finalCallback(null, resultCourse);
            });
        }
    });
}
