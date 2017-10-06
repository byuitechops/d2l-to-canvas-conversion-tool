/*eslint-env node, es6*/

/* DEPENDENCIES */
const async = require('async');
//const courseTemplate = require('./courseTemplate.js');
const processOptions = require('./processOptions.js');

/* STEP MODULES */
const prepare = require('./prepare/preparation.js');
const preImport = require('./preImport/preImport.js');
//const importCourse = require('./importCourse/importCourse.js');
//const postImport = require('./postImport/postImport.js');
//const cleanUp = require('./cleanUp/cleanUp.js');

/* STEP MODULES ARRAY */
/* This array is where each step module's function is stored
for the async waterfall below. Each of these functions contains
a main step in the process of converting a course.*/
var settings = processOptions();

const stepModules = [
  async.constant('TestFile.zip', processOptions()),
  prepare,
  preImport,
  //importCourse,
  //postImport,
  //cleanUp
];

/* Runs through each Step Module one by one */
async.waterfall(stepModules, (err, resultCourse) => {
  if (err) {
    // If we have an error, log it in our report
    resultCourse.throwFatalErr('main', err);
    //resultCourse.report.moduleLogs[err.message].fatalErrs.push(err);
  } else {
    resultCourse.report.forEach((ReportModule) => {
      console.log(`==== Module Report ==== : ${ReportModule.name}`);
      console.log(`- Errors (${ReportModule.errors.length})`);
      ReportModule.errors.forEach((error) => {
        // console.log(`- ${error}`);
      });
      console.log(`x Fatal Errors (${ReportModule.fatalErrs.length})`);
      ReportModule.fatalErrs.forEach((fatalErr) => {
        // console.log(`- ${fatalErr}`);
      });
      console.log(`+ Successes (${ReportModule.changes.length})`);
      ReportModule.changes.forEach((change) => {
        // console.log(`- ${change}`);
      });
    });
    //cleanUp();
  }
});
