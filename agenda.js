/*eslint-env node, es6*/

/* Main */
const prepare = require('./stepModules/preparation.js');
const preImport = require('./stepModules/preImport.js');
const importCourse = require('./stepModules/importCourse.js');
const postImport = require('./stepModules/postImport.js');

/* Prepare */
const createCourseObj = require('create-course-object');
const setFilePaths = require('set-file-paths');
const unzip = require('unzip');
const indexDirectory = require('index-directory').conversionTool;

/* PreImport */
const quizRelCleaner = require('quiz-rel-cleaner');
const writeCourse = require('write-course');
const zip = require('zip');

/* ImportCourse */
const createCourse = require('create-course');
const uploadCourse = require('upload-course');
const getMigrationIssues = require('get-migration-issues');

/* PostImport */
const quizFixOverlay = require('quiz-fix-overlay');
const setSyllabus = require('set-syllabus');
const removeDuplicates = require('file-delete');

/* CleanUp */
const removeFiles = require('remove-files');
const deleteCourse = require('delete-course');

exports.main = [
    prepare, // Prepares the course for editing
    preImport, // Performs course changes before the import
    importCourse, // Creates the canvas course and uploads the D2L createCourse
    postImport // Performs course changes in Canvas after the import
];
exports.prepare = [
    createCourseObj, // Creates the course object to be passed to each subsequent module
    setFilePaths, // Sets the needed filepaths based on the user's system
    unzip, // Unzips the downloaded course into a new folder
    indexDirectory // Indexes the entire course into a JSON object, added to the course object
];
exports.preImport = [
    quizRelCleaner, // removes rogue rel attributes that break API calls to canvas quiz questions
    writeCourse, // Writes the course object into actual files to be zipped and imported into Canvas
    zip // Zips the course
];
exports.importCourse = [
    createCourse, // Creates the course in Canvas
    uploadCourse, // Uploads our zipped course into our new Canvas Course
    getMigrationIssues // Retrieves any issues that occurred during upload
];
exports.postImport = [
   quizFixOverlay,
    setSyllabus, // Finds the syllabus Page, deletes it, and puts its content into the Syllabus tool
    removeDuplicates // Removes duplicate html files where we already have a page
];
exports.cleanUp = [
    removeFiles, // Removes files generated during the process
    deleteCourse // Deletes the course from Canvas (used in testing)
];
