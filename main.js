/*eslint-env node, es6*/

/* DEPENDENCIES */
const async = require('async');
const courseTemplate = require('./courseTemplate.js');

/* STEP MODULES */
const indexer = require('./indexer/indexer.js');
//const preImport = require('./preImport/preImport.js');
//const importCourse = require('./importCourse/importCourse.js');
//const postImport = require('./postImport/postImport.js');
//const cleanUp = require('./cleanUp/cleanUp.js');

/* DECLARE SETTINGS */
/* This function sets any given settings from the CLI/UI
before sending it off to the rest of the Step Modules. */
var declareCourseObject = (callback) => {
   courseTemplate.settings.debug = true;
   courseTemplate.settings.readAll = true;
   courseTemplate.settings.platform = 'online';
   courseTemplate.info.fileName = 'test';
   courseTemplate.info.originalFilepath = './test';
   callback(null, courseTemplate);
};

/* STEP MODULES ARRAY */
/* This array is where each step module's function is stored
for the async waterfall below. Each of these functions contains
a main step in the process of converting a course.*/
const stepModules = [
    declareCourseObject,
    indexer,
    //preImport,
    //importCourse,
    //postImport,
    //cleanUp
];
/* Runs through each Step Module one by one */
async.waterfall(stepModules, (err, resultCourse) => {
   if (err) {
      console.log(err.location, err);

      // If we have an error, log it in our report
      resultCourse.throwFatalErr(err.location, err);
      //resultCourse.report.moduleLogs[err.message].fatalErrs.push(err);
   } else {
      console.log('You made it!');
      console.log("resultCourse", resultCourse);
   }
   //cleanUp();
});
