/**
 * setChildModules
 * @param list - The list of child-module names to be required.
 * 
 * This function takes a list of child module names and then
 * adds them to the agenda's exports based on each child module's
 * type, located in their package.json.
 */
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
    exports.preImport.push(require('write-course')); // SHELL - Writes/copies files into a new location with preImport changes
    exports.preImport.push(require('zip')); // SHELL - Zips the course up for upload
    exports.postImport.push(require('action-series-master')); // SHELL - Runs all of the grandchildren
    // exports.postImport.push(require('course-make-backup'));
    exports.cleanUp.push(require('./shellScripts/generateReports.js')); // SHELL - Zips the course up for upload
    // exports.cleanUp.push(require('./shellScripts/endToEndTest.js')); // SHELL - Runs the end-to-end tests
};

exports.prepare = [
    require('create-course-object'), // SHELL - Creates the course object to be passed to each subsequent module
    require('set-file-paths'), // SHELL - Sets the needed filepaths based on the user's system
    require('unzip'), // SHELL - Unzips the downloaded course into a new folder
    require('index-directory').conversionTool // SHELL - Indexes the entire course into a JSON object, added to the course object
];

exports.preImport = [
    require('question-issues-report'), // DEFAULT REQUIRED - Identifies quiz questions that have known issues
    require('quiz-rel-cleaner'), // DEFAULT REQUIRED - Identifies quizzes that have a bad "rel" tag
    require('quiz-instructions'), // DEFAULT REQUIRED - moves all quiz instructions into 1 location. fixes quiz 500 errors
    require('files-find-used-content'), // DEFAULT REQUIRED - Identifies which files are used and which are conversionTool
    require('remove-blank-page-headers'), // Removes blank page headers created from module descriptions in Brightspace
];

exports.importCourse = [
    require('create-course'),
    require('./shellScripts/copyCourseWrapper.js'),
    require('canvas-course-scrubber').scrubCourse,
    require('upload-course'),
];

exports.postImport = [
    require('./shellScripts/verifyCourseUpload.js'), // DEFAULT REQUIRED - Checks that course has finished unpacking
    require('match-question-answers'), // IS THIS A GRANDCHILD?
];

exports.cleanUp = [
];

exports.optionalPreImport = [];

exports.optionalPostImport = [{
    title: 'set-syllabus',
    default: ['online', 'pathway']
}, {
    title: 'reorganize-file-structure',
    default: ['online', 'pathway']
}, {
    title: 'match-question-answers',
    default: ['online', 'campus', 'pathway']
}
];

exports.optionalCleanup = [
    'remove-files',
    'delete-course',
];