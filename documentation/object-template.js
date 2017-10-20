module.exports = {
    'report': {
        'moduleName': {
            'fatalErrs': [],
            'errors': [],
            'changes': [],
        }
    },
    'info': {
        'migrationID': '',
        'migrationIssues': [],
        'fileName': '',
        'originalFilepath': '',
        'unzippedFilepath': '',
        'preparedFilepath': '',
        'courseName': '',
        'canvasOU': 0,
        'D2LOU': 0
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
    'content': [{
        "name": '',
        "newPath": '',
        "oldPath": '',
        "ext": '',
        "dom": 'DOM',
        "isTextFile": false
    }]

    /* Functions available, check https://github.com/byuitechops/d2l-to-canvas-conversion-tool/blob/master/documentation/classFunctions.md */
};
