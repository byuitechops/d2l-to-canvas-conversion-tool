module.exports = {
    'report': {                 /* Stores a report object for each child module */
        'moduleName': {         // One of these is created for each child module
            'fatalErrs': [],    // Stores any recorded fatal errors in a module report (only used in step modules)
            'errors': [],       // Stores any recorded errors in a module report
            'changes': [],      // Stores any successful changes caused by the module of a report
            'warnings': []      // Stores recorded warnings that occurred while a module is running
        }
    },
    'info': {   /* Stores various information bits that are used by the program, but are not determined by the user */
        'migrationID': '<string>',          // ID for the course import migration
        'migrationIssues': [],              // Any issues during course import are saved here
        'fileName': '<string>',             // Name of the downloaded course zip
        'originalFilepath': '<string>',     // Absolute filepath to Where the original downloaded zip is
        'unzippedFilepath': '<string>',     // Absolute filepath to where the course is unzipped to
        'altUnzippedFilepath': '<string>',  // Absolute filepath to where the course files are written to after preImport
        'zippedFilepath': '<string>',       // Absolute filepath to where the unzipped course is zipped to
        'courseName': '<string>',           // Course name ("FDREL 121 Reference - blah blah")
        'canvasOU': 0,                      // Canvas ID for the newly created canvas course
        'D2LOU': 0                          // D2L OU number
    },
    'settings': {
        // Determines what kind of output we have
        'debug': false,
        // Determines if we read ALL zips in the present working directory
        'readAll': false,
        // Determines some actions in the process based on platform
        'online': false,
        // Determines if course should be deleted at the end
        'deleteCourse': false,
        // determines if files generated in process should be kept
        'keepFiles': false
    },
    'content': [{               /* ALL files within a course are stored here as a flat array of file objects */
        "name": '<string>',     // The file's name (i.e. "imsmanifest.xml")
        "path": '<string>',     // Absolute path to the file's location on the hard drive
        "ext": '<string>',      // File Extension (i.e. ".html")
        "dom": '<string>',      // A STRING of the file's contents (must be parsed into a dom)
        "canEdit": true         // Whether or not the file can be edited (binary files)
    }]

    /* To see what functions are available to use from the course object:
    https://github.com/byuitechops/d2l-to-canvas-conversion-tool/blob/master/documentation/classFunctions.md */
};
