module.exports = {
  'report': {
    'moduleLogs': {
      'moduleName': {
        'fatalErrs': [],
        'errors': [],
        'changes': [],
      }
    },
    throwErr: (err, location) => {
      // Add the error to the module in our report
    },
    throwFatalErr: (err, location) => {
      // Add the error to the module in our report
      // Kill the program
    },
    success: (message, location) => {
      // Add the success message to the module in our report
      /* Example: course.report.success('Altered Quiz 2.1', 'quizChildMod.js') */
    },
  },
  'info': {
    'migrationID': '',
    'migrationIssues': [],
    'fileName': '',
    'originalFilepath': '',
    'unzippedFilepath': '',
    'preparedFilepath': '',
    'courseName': '',
    'canvasCourseOU': 0,
    'D2LOU': 0
  },
  'settings': {
    // Determines what kind of output we have
    'debug': false,
    // Determines if we read ALL zips in the present working directory
    'readAll': false,
    // Determines some actions in the process based on platform
    'platform': ''
  },
  'content': {
    // Array of files with two properties: fileName and guts
    'files': [
      {
        "name": '',
        "path": '',
        "ext": '',
        "dom": 'DOM',
        "isBinary": false
      }
    ],
    // Array of directory objects, just like this
    'dirs': []
  }
};
