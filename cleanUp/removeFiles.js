/*eslint-env node, es6*/

/* Deletes all created files that aren't to be used by the user.
In debug mode, the files are not deleted. */

/* Put dependencies here */
const rimraf = require('rimraf');
const asyncLib = require('async');

/* Include this line only if working on a post-import child module */
// var canvas = require('./canvas.js');

module.exports = (course, stepCallback) => {
    /* Add module report */
    course.addModuleReport('removeFiles');

    /* If not wanting to keep files */
    if (!course.settings.keepFiles) {

        asyncLib.waterfall([
            (callback) => {
                rimraf(course.info.unzippedFilepath, err => {
                    if (err) {
                        course.throwErr('removeFiles', err);
                    } else {
                        course.success('cleanUp', 'Unzipped original course successfully removed');
                    }
                    callback();
                });
            }
            ,
            (callback) => {
                rimraf(course.info.altUnzippedFilepath, err => {
                    if (err) {
                        course.throwErr('removeFiles', err);
                    } else {
                        course.success('cleanUp', 'Unzipped altered course successfully removed');
                    }
                    callback();
                });
            }
            ,
            (callback) => {
                rimraf(course.info.zippedFilepath, err => {
                    if (err) {
                        course.throwErr('removeFiles', err);
                    } else {
                        course.success('cleanUp', 'Generated zip successfully removed');
                    }
                    callback();
                });
            }
        ], () => {
            stepCallback(null, course);
        });
    } else {
        stepCallback(null, course);
    }
};
