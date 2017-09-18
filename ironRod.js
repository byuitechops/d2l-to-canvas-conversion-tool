
/* NPM PACKAGES */
var async = require('async');

/* STEP MODULES */
const indexer = require('./indexer/indexer.js');
const preImport = require('./preImport/preImport.js');
const importCourse = require('./importCourse/importCourse.js');
const postImport = require('./postImport/postImport.js');

/* CLEANUP MODULES */
const buildReport = require('./buildReport/buildReport.js');
const cleanUp = require('./cleanUp/cleanUp.js');

/* STEP MODULES ARRAY */
/* This array is where each step module's function is stored
for the async waterfall below. Each of these functions contains
a main step in the process of converting a course.*/
const steps = [
  indexer,
  //preConversion,
  //importCourse,
  //postConversion
];

async.waterfall(steps, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
    //buildReport();
    //cleanUp();
  }
});
