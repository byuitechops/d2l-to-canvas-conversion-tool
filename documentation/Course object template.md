# The Course Object
To see what functions are available to use from the course object go to:
https://github.com/byuitechops/d2l-to-canvas-conversion-tool/blob/master/documentation/classFunctions.md 

The Logs array needs to be updated, but everything else is up to date

``` js
    /* Stores all logs, messages, warnings, errors, and fatal errors */
'logs': [],
    /* Stores various information bits that are used by the program, but are not determined by the user */
'info': { 
    'domain': '<string>'            // byui OR pathway
    'migrationID': '<string>',      // ID for the course import migration
    'fileName': '<string>',         // Name of the downloaded course zip
    'originalZipPath': '<string>',  // Absolute filepath to Where the original downloaded zip is
    'unzippedPath': '<string>',     // Absolute filepath to where the course is unzipped to
    'processedPath': '<string>',    // Absolute filepath to where the course files are written to after preImport
    'uploadZipPath': '<string>',    // Absolute filepath to where the unzipped course is zipped to
    'fileName': '<string>',         // Course name with extension("FDREL 121 Reference - blah blah.zip")
    'courseName': '<string>'        // Course Name without extension
    'courseCode': '<string>'        // The course name + the course number.
    'linkCounter': 0,               // A counter used by quiz fix overlay to generate unique Id'savePreferences
    'childModules': '<string>[]'    // Array of the names of each child module that is turned on
    'lessonFolders': '<bool>'       // Determines whether or not lesson folders are created in media/documents when reorganizing course file structure
    'canvasOU': 0,                  // Canvas ID for the newly created canvas course (or target course)
    'D2LOU': 0                      // D2L OU number
},
    /* Stores settings that are determined at runtime. Used to enable/disable features */
'settings': {
    'domain': '<string>'            // byui OR pathway (exists in 2 places, but it shouldn't)
    'platform': '<string>'          // Online, Campus, or Pathway
    'accountID': '<string>'         // set to 19
    'deleteCourse': '<bool>',       // Determines if course should be deleted at the end
    'keepFiles': '<bool>'           // determines if files generated in process should be kept
},
    /* ALL files within a course are stored here as a flat array of file objects */
'content': [{ 
    "name": '<string>',             // The file's name (i.e. "imsmanifest.xml")
    "path": '<string>',             // Absolute path to the file's location on the hard drive
    "ext": '<string>',              // File Extension (i.e. ".html")
    "dom": '<string>',              // A STRING of the file's contents (must be parsed into a dom)
    "canEdit": '<bool>'             // Whether or not the file can be edited (binary files)
}]
```
