/* eslint-env node, es6 */
/* Require any dependencies here */
const asyncLib = require('async'),
    // nameTheCourse = require('./nameTheCourse.js'),
    createCourseObj = require('./createCourseObj'),
    unzip = require('./unzip.js'),
    // setInfo = require('./setInfo.js'),
    indexDirectory = require('./indexDirectory.js');


function runIndexDirectory(course, cb) {
    course.addModuleReport('indexDirectory');
    //the path passed in will be a folder path so just use makeDir
    indexDirectory(course.info.unzippedFilepath, (makeDirErr, dir) => {
        if (makeDirErr) {
            course.throwFatalErr('indexDirectory', makeDirErr);
            cb(makeDirErr, course);
            return;
        }
        course.content = dir;
        course.success('indexDirectory', 'Successfully indexed the course');
        cb(null, course);
    });
}

/* Our main function, called by main.js*/
module.exports = (filePath, settings, mainCallback) => {
    /* List child modules in order of of operation */
    const childModules = [
    asyncLib.constant(filePath, settings),
    createCourseObj,
    //nameTheCourse,
    unzip,
    //setInfo,
    runIndexDirectory
  ];

    asyncLib.waterfall(childModules, (err, resultCourse) => {
        if (err) {
            /* If we have an error, throw it back up to main.js */
            mainCallback(err, resultCourse);
        } else {
            /* If successful, head on to the next sub module */
            resultCourse.success(
                'indexer', 'Course successfully created and indexed.'
            );
            mainCallback(null, resultCourse);
        }
    });

};
