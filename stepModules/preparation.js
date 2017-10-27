/* eslint-env node, es6 */
/* Require any dependencies here */
const asyncLib = require('async'),
    agenda = require('../agenda.js'),
    insertFunction = require('../insertFunction.js'),
    verify = require('../verify.js');

// function runIndexDirectory(course, cb) {
//     course.addModuleReport('indexDirectory');
//     //the path passed in will be a folder path so just use makeDir
//     indexDirectory(course.info.unzippedFilepath, (makeDirErr, fileList) => {
//         if (makeDirErr) {
//             course.throwFatalErr('indexDirectory', makeDirErr);
//             cb(makeDirErr, course);
//             return;
//         }
//         course.content = fileList;
//         course.success('indexDirectory', 'Successfully indexed the course');
//         cb(null, course);
//     });
// }

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
