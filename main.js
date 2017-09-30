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

/* STEP MODULES ARRAY */
/* This array is where each step module's function is stored
for the async waterfall below. Each of these functions contains
a main step in the process of converting a course.*/
const stepModules = [
  async.constant('./TestFile.zip', {
    debug: 'true', readAll: 'true', platform: 'online'
  }),
  indexer,
  //preImport,
  //importCourse,
  //postImport,
  //cleanUp
];

/* Runs through each Step Module one by one */
async.waterfall(stepModules, (err, resultCourse) => {
  if (err) {
    console.log(err);
    // If we have an error, log it in our report
    resultCourse.throwFatalErr('main', err);
    //resultCourse.report.moduleLogs[err.message].fatalErrs.push(err);
  } else {
    resultCourse.report.forEach((ReportModule) => {
      console.log(`==== Module Report ==== : ${ReportModule.name}`);
      console.log(`Errors (${ReportModule.errors.length})`);
      ReportModule.errors.forEach((error) => {
        console.log(`- ${error}`);
      });
      console.log(`Fatal Errors (${ReportModule.fatalErrs.length})`);
      ReportModule.fatalErrs.forEach((fatalErr) => {
        console.log(`- ${fatalErr}`);
      });
      console.log(`Successes (${ReportModule.changes.length})`);
      ReportModule.changes.forEach((change) => {
        console.log(`- ${change}`);
      });
    });
    //cleanUp();
  }
});
