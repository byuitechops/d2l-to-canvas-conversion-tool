
/* NPM PACKAGES */
var async = require('async');

/* STEP MODULES */
var indexer = require('./indexer.js');
//const preConversion = require('./preConversion').run();
//const importCourse = require('./importCourse').run();
//const postConversion = require('./postConversion').run();

/* CLEANUP MODULES */
//const buildReport = require('./buildReport');
//const cleanUp = require('./cleanUp');

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
