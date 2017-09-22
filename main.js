/* NPM PACKAGES */
var async = require('async');

/* STEP MODULES */
const indexer = require('./indexer/indexer.js');
const preImport = require('./preImport/preImport.js');
const importCourse = require('./importCourse/importCourse.js');
const postImport = require('./postImport/postImport.js');
const cleanUp = require('./cleanUp/cleanUp.js');

/* STEP MODULES ARRAY */
/* This array is where each step module's function is stored
for the async waterfall below. Each of these functions contains
a main step in the process of converting a course.*/

/*"async.constant()" is used here and the step modules to pass
the course object into each level of waterfall. In this case,
it is used to create the initial course object. */



const stepModules = [
    async.constant({}),
    indexer,
    preImport,
    importCourse,
    postImport,
    cleanUp
];

async.waterfall(stepModules, (err, resultCourse) => {
    if (err) {
        // If we have an error, log it in our report

        console.log(err);
        //resultCourse.report.moduleLogs[err.message].fatalErrs.push(err);
    } else {

    }
    cleanUp();
});
