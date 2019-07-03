# The Course Object
To see what functions are available to use from the course object go to:
https://github.com/byuitechops/d2l-to-canvas-conversion-tool/blob/master/documentation/classFunctions.md 

The Logs array needs to be updated, but everything else is up to date

``` js
    /* Stores all logs, messages, warnings, errors, and fatal errors */
'logs': [],
    /* Stores settings that are determined at runtime. Used to enable/disable features */
'settings': { 
    'domain': '<string>'            // byui OR pathway
    'platform': '<string>'          // Online, Campus, or Pathway
    'accountID': '<string>'         // set to 19
    'cookies': '<object>[]'         // D2L login cookies
    'deleteCourse': '<bool>',       // Determines if course should be deleted at the end
    'removeFiles': '<bool>'         // Determines if files generated in process should be kept
    'reorganizeFiles': '<bool>'     // Determines if the reorganize-files child module runs
    'lessonFolders': '<bool>'       // Determines whether or not lesson folders are created in media/documents when reorganizing course file structure
    'pinDiscussionBoards': '<bool>' // Determines if the pin-discussion-boards child module runs
    'blockCourse': '<bool>'         // Determines if the course is a block course
    'targetAttributes': '<bool>'    // Determines if the target-attributes child module runs
    'disableLogOutput': '<bool>'    // Determines if the log ouptut runs
    'blueprintLockItems': '<bool>'  // Determines if the blueprint-lock-items child module runs
    'moveUnusedToArchive': '<bool>' // Determines if unused files are moved to the archive folder
    'renameFiles': '<bool>'         //
    'moveFiles': '<bool>'           // Determines if files are sorted into the Documents, Media, and Template folders
    'moduleItemNamingConventions': '<bool>' // Determines if the module-item-namin-conventions child module runs
    'term': '<bool>'                // The term of the course 
},
    /* Stores various information bits that are used by the program, but are not determined by the user */
'info': {
    'data': '<object>[]',           // Copy of object created by prompt. Kept as a backup. DO NOT USE
    'username': '<string>',         // The users username. Required to download course from D2L
    'password': '<string>',         // The users password. Required to download course from D2L
    'instructorName': '<string>',   // Instructors first and last name
    'instructorEmail': '<string>',  // Instructors email
    'courseName': '<string>'        // Course Name without extension
    'courseCode': '<string>'        // The course name + the course number
    'D2LOU': '<int>'                // D2L OU number
    'originalZipPath': '<string>',  // Absolute filepath to Where the original downloaded zip is
    'unzippedPath': '<string>',     // Absolute filepath to where the course is unzipped to
    'processedPath': '<string>',    // Absolute filepath to where the course files are written to after preImport
    'uploadZipPath': '<string>',    // Absolute filepath to where the unzipped course is zipped to
    'fileName': '<string>',         // Course name with extension("FDREL 121 Reference - blah blah.zip")
    'childModules': '<string>[]'    // Array of the names of each child module that is turned on
    'canvasOU': '<int>',            // Canvas ID for the newly created canvas course (or target course)
    'bannerDashBoardImagesType': '<String' // Necessary property for course dashboard image/home banner
    'bannerDashboardImagesFileLocation': '<String>' // Necessary property for course dashboard image/home banner
    'checkStandards': '<bool>',     // Enables course-standards-check. Always false
    'linkCounter': '<int>',         // A counter used by quiz fix overlay to generate unique Id'savePreferences
    'canvasFolders': '<object>',    // Contains ID's for Documents, Media, Template, and Archive folders
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
