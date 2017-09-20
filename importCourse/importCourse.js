// CHILD MODULES - Modules used by this module to complete its task
const createCourse = require('./importCourse/createCourse.js');
const uploadCourse = require('./importCourse/uploadCourse.js');
const getMigrationIssues = require('./importCourse/getMigrationIssues.js');
const async = require('async')


/* Require any dependencies here */
const async = require('async');

/* Our main function, called by main.js*/
module.exports = (course, mainCallback) => {

    /* List child modules in order of of operation */
    const childModules = [
    async.constant(course),
      createCourse,
      uploadCourse,
      getMigrationIssues
  ];

    async.waterfall(childModules, (err, resultCourse) => {
        if (err) {
            // If we have an error, send it up to main.js
            mainCallback(err, resultCourse);
        } else {
            // If successful, return the course to main.js
            mainCallback(null, resultCourse);
        }
    });

};
