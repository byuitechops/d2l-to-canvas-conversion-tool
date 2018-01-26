/*eslint-env node, es6*/

/* Prepare */
const createCourseObj = require('create-course-object');
const setFilePaths = require('set-file-paths');
const unzip = require('unzip');
const indexDirectory = require('index-directory').conversionTool;

/* PreImport */
const quizRelCleaner = require('quiz-rel-cleaner');
const courseFileVideos = require('course-file-videos');
const writeCourse = require('write-course');
const filesFindUsedContent = require('files-find-used-content');
const zip = require('zip');

/* ImportCourse */
const createCourse = require('create-course');
const uploadCourse = require('upload-course');
const getMigrationIssues = require('get-migration-issues');

/* PostImport */
const verifyCourseUpload = require('./verifyCourseUpload.js');
const quizFixOverlay = require('quiz-fix-overlay');
const deleteQnC = require('delete-questions-and-conversations');
const makeBlueprint = require('course-make-blueprint');

/* CleanUp */
const removeFiles = require('remove-files');
const deleteCourse = require('delete-course');
const consoleReport = require('./report/consoleReport.js');
const jsonReport = require('./report/jsonReport.js');
// const htmlReport = require('./report/htmlReport.js');
const generateTables = require('./report/generateTables.js');

exports.setChildModules = (list) => {
    list.forEach(item => {
        var {
            childType
        } = require(`./node_modules/${item}/package.json`);
        if (childType === 'preImport') {
            exports.preImport.push(require(item));
        } else if (childType === 'postImport') {
            exports.postImport.push(require(item));
        }
    });
    /* Guarantee these run last */
    exports.preImport.push(writeCourse);
    exports.preImport.push(zip);
};

exports.prepare = [
    createCourseObj, // Creates the course object to be passed to each subsequent module
    setFilePaths, // Sets the needed filepaths based on the user's system
    unzip, // Unzips the downloaded course into a new folder
    indexDirectory // Indexes the entire course into a JSON object, added to the course object
];

exports.preImport = [
    quizRelCleaner, // Identifies and cleans quizzes with CDATA in them (where JS scripts used to be)
    courseFileVideos, // Identifies and saves names of video files in course files, for later review
    filesFindUsedContent, // Identifies which files are used and which are conversionTool
];

exports.importCourse = [
    createCourse, // Creates the course in Canvas
    uploadCourse, // Uploads our zipped course into our new Canvas Course
    getMigrationIssues, // Retrieves any issues that occurred during upload
];

exports.postImport = [
    verifyCourseUpload, // Checks that course has finished unpacking
    quizFixOverlay, // Fixes issues with javascript in quiz questions
    deleteQnC, // Deletes Questions and Conversations discussion boards | ONLINE ONLY
    makeBlueprint, // Makes the course a blueprint course IF it is an online course
];

exports.cleanUp = [
    removeFiles, // Removes files generated during the process
    deleteCourse, // Deletes the course from Canvas (used in testing),
    consoleReport, // Generates report in the console
    generateTables,
    jsonReport, // Generates JSON report
    // htmlReport, // Generates HTML report
];