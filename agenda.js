/**
 * setChildModules
 * @param list - The list of child-module names to be required.
 * 
 * This function takes a list of child module names and then
 * adds them to the agenda's exports based on each child module's
 * type, located in their package.json.
 */

/* Options for various modules. Each is added to course.settings with its 'name' */
/* MAKE SURE TO ADD THESE TO THE COURSE OBJECT DEFAULT TO FALSE */
exports.options = [{
    name: 'lessonFolders',
    description: 'LESSON FOLDERS: Creates Lesson Folders in media/documents',
    default: ['online', 'pathway']
}, {
    name: 'targetAttributes',
    description: 'TARGET ATTRIBUTES (Grandchild): Enables grandchild that sets all external links to open in a new tab',
    default: ['online', 'pathway']
}, {
    name: 'blockCourse',
    description: 'BLOCK COURSE: Runs as a Block Course (will auto-apply if course title contains "block")',
    default: []
}, {
    name: 'disableLogOutput',
    description: 'DISABLE LOG OUTPUT: Disables course.log and course.message output (warning and error still display)',
    default: []
}];

exports.setChildModules = (list) => {
    /* list is an array of selected optional child modules */
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
    exports.postImport.push(require('course-make-backup')); // WARNING REQUIRED for online, DISABLED for campus MUST RUN LAST!
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
    require('report-html-tags'), // Reports any script or style tags present in an HTML page
];

exports.importCourse = [
    require('create-course'),
    require('./shellScripts/copyCourseWrapper.js'),
    require('canvas-course-scrubber').scrubCourse,
    require('upload-course'),
];

exports.postImport = [
    require('./shellScripts/verifyCourseUpload.js'), // DEFAULT REQUIRED - Checks that course has finished unpacking
    require('quiz-fix-overlay'), // DEFAULT REQUIRED - Fixes issues with javascript in quiz questions
    require('course-make-blueprint'), // ONLINE ONLY (REQUIRED) - Makes the course a blueprint course IF it is an online course
    require('set-navigation-tabs'), // REQUIRED FOR ONLINE - Sets the navigation tabs to match the OCT
    require('create-homepage'), // REQUIRED FOR ONLINE - Creates the homepage using the online template
    require('course-settings'), // REQUIRED FOR ONLINE - Sets the course settings as written in this module's documentation
    require('assignment-categories'), // DEFAULT REQUIRED - Does not change anything; just validates if grade weights add up to 100
    require('course-description'), // DEFAULT REQUIRED - Uses Puppeteer to retrieve the course description from byui.edu (does not work for pathway)
];

exports.cleanUp = [];

exports.optionalPreImport = [];

exports.optionalPostImport = [{
    title: 'set-syllabus', // REQUIRED FOR ONLINE - Sets the syllabus of a course, if one is available
    default: ['online', 'pathway']
}, {
    title: 'groups-bridge', // COPIES GROUPS FROM D2L TO CANVAS
    default: ['online', 'pathway', 'campus']
}, {
    title: 'disperse-welcome-folder',
    default: ['online', 'pathway']
}, {
    title: 'setup-instructor-resources',
    default: ['online', 'pathway']
}, {
    title: 'reorganize-file-structure',
    default: ['online', 'pathway']
}, {
    title: 'blueprint-lock-items',
    default: ['online', 'pathway']
}, {
    title: 'generate-headers',
    default: []
}];

exports.optionalCleanup = [
    'remove-files',
    'delete-course',
];