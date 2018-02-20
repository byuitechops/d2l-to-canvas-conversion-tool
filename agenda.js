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
const references = require('ilearn-3-references');
const questionIssuesReport = require('question-issues-report');
const removeBlankPageHeaders = require('remove-blank-page-headers');
const zip = require('zip');

/* ImportCourse */
const createCourse = require('create-course');
const copyCourse = require('./copyCourseWrapper.js');
const scrubCourse = require('canvas-course-scrubber').scrubCourse;
const uploadCourse = require('upload-course');
// const getMigrationIssues = require('get-migration-issues');

/* PostImport */
const reorganizeFileStructure = require('reorganize-file-structure');
const makeBlueprint = require('course-make-blueprint');
const setSyllabus = require('set-syllabus');
const setNavigationTabs = require('set-navigation-tabs');
const verifyCourseUpload = require('./verifyCourseUpload.js');
const quizFixOverlay = require('quiz-fix-overlay');
const createHomepage = require('create-homepage');
const webFeaturesUpdate = require('web-features-update');
const deleteUnwantedAssignments = require('assignments-delete-unwanted');
const publishSettings = require('module-publish-settings');

/* CleanUp */
const removeFiles = require('remove-files');
const deleteCourse = require('delete-course');
const consoleReport = require('./report/consoleReport.js');
const jsonReport = require('./report/jsonReport.js');
// const htmlReport = require('./report/htmlReport.js');

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
    exports.preImport.push(writeCourse); // SHELL - Writes/copies files into a new location with preImport changes
    exports.preImport.push(zip); // SHELL - Zips the course up for upload
};

exports.prepare = [
    createCourseObj, // SHELL - Creates the course object to be passed to each subsequent module
    setFilePaths, // SHELL - Sets the needed filepaths based on the user's system
    unzip, // SHELL - Unzips the downloaded course into a new folder
    indexDirectory // SHELL - Indexes the entire course into a JSON object, added to the course object
];

exports.preImport = [
    // questionIssuesReport, // DEFAULT REQUIRED - Identifies quiz questions that have known issues
    quizRelCleaner, // DEFAULT REQUIRED - Identifies quizzes that have a bad "rel" tag
    courseFileVideos, // DEFAULT REQUIRED - Identifies and saves names of video files in course files, for later review
    filesFindUsedContent, // DEFAULT REQUIRED - Identifies which files are used and which are conversionTool
    references, // REQUIRED FOR ONLINE - Identifies references to outdated technologies
    removeBlankPageHeaders,
];

exports.importCourse = [
    createCourse, // SHELL - Creates the course in Canvas
    copyCourse, // SHELL - Makes a copy of the prototype course
    scrubCourse, // SHELL - Cleans the original prototype course in prep for upload
    uploadCourse, // SHELL - Uploads our zipped course into our new Canvas Course
    // getMigrationIssues, // SHELL - Retrieves any issues that occurred during upload
];

exports.postImport = [
    verifyCourseUpload, // DEFAULT REQUIRED - Checks that course has finished unpacking
    quizFixOverlay, // DEFAULT REQUIRED - Fixes issues with javascript in quiz questions
    reorganizeFileStructure, // ONLINE ONLY (REQUIRED) - Organizes the course's files into Documents, Media, Archive, and Template
    makeBlueprint, // ONLINE ONLY (REQUIRED) - Makes the course a blueprint course IF it is an online course
    setSyllabus, // REQUIRED FOR ONLINE - Sets the syllabus of a course, if one is available
    setNavigationTabs, // REQUIRED FOR ONLINE - Sets the navigation tabs to match the OCT
    createHomepage, // REQUIRED FOR ONLINE - Creates the homepage using the online template
    webFeaturesUpdate, // REQUIRED FOR ONLINE - Creates and removes specific html for online styling
    deleteUnwantedAssignments, // REQUIRED FOR ONLINE - Removes [CO#] assignments from the course
    publishSettings, // DEFAULT REQUIRED - Publishes/ Unpublishes items according to their settings in D2L
];

exports.cleanUp = [
    removeFiles, // SHELL - Removes files generated during the process
    deleteCourse, // SHELL - Deletes the course from Canvas (used in testing),
    consoleReport, // SHELL - Generates report in the console
    jsonReport, // SHELL - Generates JSON report
    // htmlReport, // SHELL - Generates HTML report
];