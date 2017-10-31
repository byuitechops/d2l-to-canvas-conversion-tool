/* eslint-env node, es6 */
/* Require any dependencies here */
const asyncLib = require('async'),
    agenda = require('../agenda.js'),
    insertFunction = require('../insertFunction.js'),
    verify = require('course-object-verifier');

/* Our main function, called by main.js*/
module.exports = (filePath, settings, mainCallback) => {
    /* List child modules in order of of operation */
    var childModules = [
        asyncLib.constant(filePath, settings),
        ...insertFunction(agenda.prepare, verify)
    ];
    asyncLib.waterfall(childModules, (err, resultCourse) => {
        if (err) {
            mainCallback(err, resultCourse);
        } else {
            /* If successful, head on to the next sub module */
            resultCourse.success(
                'preparation', 'Preparation processes completed successfully.'
            );
            mainCallback(null, resultCourse);
        }
    });

};
