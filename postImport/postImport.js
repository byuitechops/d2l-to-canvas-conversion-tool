/* Require any dependencies here */
const async = require('async');
const insertFunction = require('../insertFunction.js');
const verify = require('../verify.js');
const agenda = require('../agenda.js');

/* Our main function, called by main.js*/
module.exports = (course, mainCallback) => {
    course.addModuleReport('postImport');
    childModules = insertFunction(agenda.postImport, verify);
    async.waterfall(
        [async.constant(course), ...agenda.postImport],
        (err, resultCourse) => {
        if (err) {
            mainCallback(err, resultCourse);
        } else {
            resultCourse.success(
                'postImport', 'Post-Import processes completed successfully.'
            );
            mainCallback(null, resultCourse);
        }
    });
};
