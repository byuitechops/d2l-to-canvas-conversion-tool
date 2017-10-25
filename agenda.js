/* Main */
const prepare = require('./prepare/preparation.js');
const preImport = require('./preImport/preImport.js');
const importCourse = require('./importCourse/importCourse.js');
const postImport = require('./postImport/postImport.js');
const cleanUp = require('./cleanUp/cleanUp.js');
const verify = require('./verify.js');
const insertFunction = require('./insertFunction.js');

/* Prepare */
const createCourseObj = require('./prepare/createCourseObj');
const setFilePaths = require('./prepare/setFilePaths.js');
const unzip = require('./prepare/unzip.js');
const indexDirectory = require('./prepare/indexDirectory.js');

/* PreImport */
const writeCourse = require('./preImport/writeCourse.js');
const zip = require('./preImport/zip.js');

/* ImportCourse */
const createCourse = require('./importCourse/createCourse.js');
const uploadCourse = require('./importCourse/uploadCourse.js');
const getMigrationIssues = require('./importCourse/getMigrationIssues.js');

/* PostImport */
const setSyllabus = require('set-syllabus');
const removeDuplicates = require('file-delete');

/* CleanUp */
const removeFiles = require('./cleanUp/removeFiles.js');
const deleteCourse = require('./cleanUp/deleteCourse.js');

module.exports = {
        main: [
            prepare,            // Prepares the course for editing
            preImport,          // Performs course changes before the import
            importCourse,       // Creates the canvas course and uploads the D2L createCourse
            postImport          // Performs course changes in Canvas after the import
        ],
        prepare: [
            createCourseObj,    // Creates the course object to be passed to each subsequent module
            setFilePaths,       // Sets the needed filepaths based on the user's system
            unzip,              // Unzips the downloaded course into a new folder
            indexDirectory      // Indexes the entire course into a JSON object, added to the course object
        ],
        preImport: [
            writeCourse,        // Writes the course object into actual files to be zipped and imported into Canvas
            zip                 // Zips the course
        ],
        importCourse: [
            createCourse,       // Creates the course in Canvas
            uploadCourse,       // Uploads our zipped course into our new Canvas Course
            getMigrationIssues  // Retrieves any issues that occurred during upload
        ],
        postImport: [
            setSyllabus,        // Finds the syllabus Page, deletes it, and puts its content into the Syllabus tool
            removeDuplicates    // Removes duplicate html files where we already have a page
        ],
        cleanUp: [
            removeFiles,        // Removes files generated during the process
            deleteCourse        // Deletes the course from Canvas (used in testing)
        ],
};
