module.exports = {
  'report': {
    'moduleLogs': {
      'moduleName': {
        'fatalErrs': [],
        'errors': [],
        'changes': [],
      }
    },
    'generatedReport': ''
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
    'files': [],
    // Array of directory objects, just like this
    'dirs': []
  }
};
