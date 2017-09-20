/* NPM PACKAGES */
var async = require('async');

/* STEP MODULES */
const unzip = require('./unzip.js');
const indexCourse.js = require('./indexCourse.js');


/* STEP MODULES ARRAY */
/* This array is where each step module's function is stored
for the async waterfall below. Each of these functions contains
a main step in the process of converting a course.*/
const steps = [
    unzip,
    indexCourse
];

async.waterfall(steps, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});






/*
module.exports = function(callback) {
  console.log('ran');
  callback(null);
};
*/
