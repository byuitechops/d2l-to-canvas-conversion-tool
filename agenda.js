/* Main */
const prepare = require('./prepare/preparation.js');
const preImport = require('./preImport/preImport.js');
const importCourse = require('./importCourse/importCourse.js');
const postImport = require('./postImport/postImport.js');
const cleanUp = require('./cleanUp/cleanUp.js');
const verify = require('./verify.js');
const insertFunction = require('../insertFunction.js');

/* Prepare */
const createCourseObj = require('./createCourseObj');
const setFilePaths = require('./setFilePaths.js');
const unzip = require('./unzip.js');
const indexDirectory = require('./indexDirectory.js');

/* PreImport */
const writeCourse = require('./writeCourse.js');
const zip = require('./zip.js');

/* ImportCourse */
const createCourse = require('./createCourse.js');
const uploadCourse = require('./uploadCourse.js');
const getMigrationIssues = require('./getMigrationIssues.js');

/* PostImport */
const setSyllabus = require('set-syllabus');
const removeDuplicates = require('file-delete');

/* CleanUp */
const removeFiles = require('./removeFiles.js');
const deleteCourse = require('./deleteCourse.js');

module.exports = {
        main: {
            prepare,
            preImport,
            importcourse,
            postImport
        },
        prepare: {
            createCourseObj,
            setFilePaths,
            unzip,
            indexDirectory
        },
        preImport: {
            writeCourse,
            zip
        },
        importCourse: {
            createCourse,
            uploadCourse,
            getMigrationIssues
        },
        postImport: {
            setSyllabus,
            removeDuplicates
        },
        cleanUp: {
            removeFiles,
            deleteCourse
        },
};
