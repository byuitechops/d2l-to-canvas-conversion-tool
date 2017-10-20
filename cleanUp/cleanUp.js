/*eslint-env node, es6*/

const removeFiles = require('./removeFiles.js');
const deleteCourse = require('./deleteCourse.js');
const asyncLib = require('async');

module.exports = function (course, mainCallback) {
    course.addModuleReport('cleanUp');

    var cleanUpSteps = [
        asyncLib.constant(course),
        removeFiles,
        deleteCourse
    ];

    /* STEP LOGIC */
    asyncLib.waterfall(cleanUpSteps, (err, resultCourse) => {
        if (err) mainCallback(err, resultCourse);
        else mainCallback(null, resultCourse);
    });
};
