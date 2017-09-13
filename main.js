// MAIN STEP MODULES
const downloadCourse = require('./downloadCourse/downloadCourse.js');
const preConversion = require('./preConversion/preConversion.js');
const importCourse = require('./importCourse/importCourse.js');
const postConversion = require('./postConversion/postConversion.js');
const buildReport = require('./buildReport/buildReport.js');

// NPM PACKAGES
const async = require('async');

// Course ID
var courseId = '0';

// ID Setter and Getter
exports.setId = (id) => {
  courseId = id;
};

exports.getId = () => {
  return courseId;
};

/* Each Step Module of the Conversion Process */
const steps = [
  downloadCourse,
  preConversion,
  importCourse,
  postConversion,
  buildReport
];

/* Loops through each main step of the conversion process */
async.eachLimit(steps, 1, (step, callback) => {
  // Fire off the module's run function
  step.run(() => {
    // When the module's run is complete, it runs this function
    callback();
  });
}, (err) => {
  // If we have an error anywhere in the process, tell us here
  if (err) {
    console.log(err);
    // Let us know when the process is completely finished
  } else {
    console.log('Complete');
  }
});
