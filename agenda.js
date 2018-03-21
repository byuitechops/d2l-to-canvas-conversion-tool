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
    exports.postImport.push(require('course-make-backup')); // REQUIRED FOR ALL. MUST RUN LAST
};

exports.prepare = [
    require('create-course-object'), // SHELL - Creates the course object to be passed to each subsequent module
    require('set-file-paths'), // SHELL - Sets the needed filepaths based on the user's system
    require('unzip'), // SHELL - Unzips the downloaded course into a new folder
    require('index-directory').conversionTool // SHELL - Indexes the entire course into a JSON object, added to the course object
];

exports.preImport = [
    // require('question-issues-report'), // DEFAULT REQUIRED - Identifies quiz questions that have known issues
    require('quiz-rel-cleaner'), // DEFAULT REQUIRED - Identifies quizzes that have a bad "rel" tag
    require('course-file-videos'), // DEFAULT REQUIRED - Identifies and saves names of video files in course files, for later review
    // require('files-find-used-content'), // DEFAULT REQUIRED - Identifies which files are used and which are conversionTool
    require('ilearn-3-references'), // REQUIRED FOR ONLINE - Identifies references to outdated technologies
    require('remove-blank-page-headers'),
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
    require('reorganize-file-structure'), // ONLINE ONLY (REQUIRED) - Organizes the course's files into Documents, Media, Archive, and Template
    require('course-make-blueprint'), // ONLINE ONLY (REQUIRED) - Makes the course a blueprint course IF it is an online course
    require('set-syllabus'), // REQUIRED FOR ONLINE - Sets the syllabus of a course, if one is available
    require('set-navigation-tabs'), // REQUIRED FOR ONLINE - Sets the navigation tabs to match the OCT
    require('create-homepage'), // REQUIRED FOR ONLINE - Creates the homepage using the online template
    require('assignments-delete-unwanted'), // REQUIRED FOR ONLINE - Removes [CO#] assignments from the course
    require('module-publish-settings'), // DEFAULT REQUIRED - Publishes/ Unpublishes items according to their settings in D2L
    require('course-settings'), // REQUIRED FOR ONLINE - Sets the course settings as written in this module's documentation
    require('action-series-master'), // REQUIRED FOR ONLINE - Runs action series model
];

exports.cleanUp = [
    require('./report/consoleReport.js'), // SHELL - Generates report in the console
    require('./report/jsonReport.js'), // SHELL - Generates JSON report
    require('./report/htmlReport.js'), // SHELL - Generates JSON report
];

exports.optionalPreImport = [];

exports.optionalPostImport = [{
    title: 'blueprint-lock-items',
    default: ['online', 'pathway']
}, {
    title: 'disperse-welcome-folder',
    default: ['online', 'pathway']
}, {
    title: 'notes-from-instructor',
    default: ['online', 'pathway']
}, {
    title: 'setup-instructor-resources',
    default: ['online', 'pathway']
}, {
    title: 'match-question-answers',
    default: ['online', 'pathway']
}, {
    title: 'quiz-instructions',
    default: ['online', 'pathway']
}
];

exports.optionalCleanup = [
    'remove-files',
    'delete-course',
];