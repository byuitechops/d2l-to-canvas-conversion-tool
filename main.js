/*eslint-env node, es6*/

/* DEPENDENCIES */
const async = require('async');
//const courseTemplate = require('./courseTemplate.js');
const processOptions = require('./processOptions.js');
const verify = require('./verify.js');
const insertFunction = require('./insertFunction.js');
const chalk = require('chalk');
const fws = require('fixed-width-string');

/* STEP MODULES */
const prepare = require('./prepare/preparation.js');
const preImport = require('./preImport/preImport.js');
// const importCourse = require('./importCourse/importCourse.js');
// const postImport = require('./postImport/postImport.js');
//const cleanUp = require('./cleanUp/cleanUp.js');

var settings = processOptions();

/* STEP MODULES ARRAY */
/* This array is where each step module's function is stored
for the async waterfall below. Each of these functions contains
a main step in the process of converting a course.*/

var stepModules = [
  async.constant('TestFile 101.zip', processOptions()),
  prepare,
  preImport,
  // importCourse,
  //postImport,
  //cleanUp
];

if (settings.debug) {
    stepModules = insertFunction(stepModules, verify);
}

/* Runs through each Step Module one by one */
async.waterfall(stepModules, (err, resultCourse) => {
  if (err) {
    /* Only fatal errors make it to this point.
     All others are just reported where they happen. */
     console.log(err);
    resultCourse.throwFatalErr('main', 'A Fatal Error was thrown.');
  } else {
    resultCourse.report.forEach((ReportModule) => {
      console.log(chalk.yellowBright(`\nModule Report: ${chalk.yellow(ReportModule.name)}\n`));
      console.log(fws(`Errors`, 20, {padding: '.'}) + chalk.red(ReportModule.errors.length));
      console.log(fws(`Fatal Errors`, 20, {padding: '.'}) + chalk.red(ReportModule.fatalErrs.length));
      console.log(fws(`Successes`, 20, {padding: '.'}) + chalk.greenBright(ReportModule.changes.length));
    });
    //cleanUp();
  }
});
