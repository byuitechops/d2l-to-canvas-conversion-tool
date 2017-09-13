// MAIN STEP MODULES
const downloadCourse = require('./downloadCourse.js');
const preConversion = require('./preConversion.js');
const importCourse = require('./importCourse.js');
const postConversion = require('./postConversion.js');
const buildReport = require('./buildReport.js');

// NPM PACKAGES
const async = require('async');

// Course ID (Get and Set)
var courseId = '0';
exports.setCourseId = (id) => {
  courseId = id;
};
exports.getCoursId = () => {
  return courseId;
};

// filename (Course ZIP) Get & Set
var filename = 'default.zip';
exports.setFileName = (courseFilename) => {
  filename = courseFilename;
};
exports.getFilename = () => {
  return filename;
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
