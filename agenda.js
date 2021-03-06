// NOTE - PREPARATION (SHELL)
module.exports.preparation = [{
    name: 'create-course-object',
    type: 'preparation',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Creates the course object used by all other modules.',
    requiredModules: [],
    options: []
}, {
    name: 'set-file-paths',
    type: 'preparation',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Sets the file paths to various files, such as the course download.',
    requiredModules: [],
    options: []
}, {
    name: 'unzip',
    type: 'preparation',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Unzips the downloaded course.',
    requiredModules: [],
    options: []
}, {
    name: 'index-directory',
    type: 'preparation',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Indexes the downloaded, unzipped course and adds it to the Course object.',
    requiredModules: [],
    options: []
}, {
    name: 'course-has-content',
    type: 'preparation',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Ensures the course has content so it can upload without breaking',
    requiredModules: [],
    options: []
}];

// NOTE - PREIMPORT
module.exports.preImport = [{
    name: 'question-issues-report',
    type: 'preImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Identifies every question that will probably have issues after conversion.',
    requiredModules: [],
    options: []
}, {
    name: 'quiz-rel-cleaner',
    type: 'preImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Removes bad "rel" tags from quizzes.',
    requiredModules: [],
    options: []
}, {
    name: 'quiz-instructions',
    type: 'preImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Moves all quiz instructions to one place for each quiz, fixing the 500 internal server error issue with quizzes.',
    requiredModules: [],
    options: []
}, {
    name: 'report-html-tags',
    type: 'preImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Identifies any script and style tags that will be stripped on import by Canvas.',
    requiredModules: [],
    options: []
}, {
    name: 'find-quiz-regex',
    type: 'preImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Identifies regex answers within quizzes.',
    requiredModules: [],
    options: []
}, {
    name: 'remove-blank-page-headers',
    type: 'preImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'disabled'
    },
    description: 'Removes blank page headers created in place of module descriptions.',
    requiredModules: [],
    options: []
}, {
    name: 'mismatched-quiz-points',
    type: 'preImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Identifies quizzes that will have a different grade value in Canvas vs. D2L.',
    requiredModules: [],
    options: []
}, {
    name: 'random-sections-check',
    type: 'preImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Identifies random sections within quizzes.',
    requiredModules: [],
    options: []
}, {
    name: 'write-course',
    type: 'preImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'After edits are made, writes the entire course object back to the hard drive to be zipped for upload.',
    requiredModules: [],
    options: []
}, {
    name: 'zip',
    type: 'preImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Zips the course up for upload.',
    requiredModules: [],
    options: []
}];

// NOTE - IMPORT
module.exports.import = [{
    name: 'create-course',
    type: 'import',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'optional'
    },
    description: 'Creates a new course in Canvas.',
    requiredModules: [],
    options: []
}, {
    name: 'upload-course',
    type: 'import',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Uploads the D2L course into the newly created Canvas course.',
    requiredModules: [],
    options: []
}];

// NOTE - POSTIMPORT
module.exports.postImport = [{
    name: './shellScripts/verifyCourseUpload.js',
    type: 'postImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Verifies that the entire course has finished unpacking.',
    requiredModules: [],
    options: []
}, {
    name: 'remove-dateless-events',
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'required'
    },
    description: 'Deletes calendar event without start & end dates.',
    requiredModules: [],
    options: []
}, {
    name: 'files-find-used-content',
    type: 'postImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Identifies which files are used, and which are not.',
    requiredModules: [],
    options: []
}, {
    name: 'quiz-fix-overlay',
    type: 'postImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Fixes issues with certain quiz overlays not working correctly.',
    requiredModules: [],
    options: []
}, {
    name: 'quiz-time-limit',
    type: 'postImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Removes time limits from quizzes that shouldn\'t have them.',
    requiredModules: [],
    options: []
}, {
    name: 'course-make-blueprint',
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'disabled'
    },
    description: 'Makes the course a blueprint course.',
    requiredModules: [],
    options: []
}, {
    name: 'campus-standard-modules',
    type: 'postImport',
    platform: {
        online: 'disabled',
        pathway: 'disabled',
        campus: 'required'
    },
    description: 'Creates student resources and instructor resources if missing.',
    requiredModules: [],
    options: []
}, {
    name: 'build-file-structure',
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'optional'
    },
    description: 'Restructures the folders in the course files.',
    requiredModules: [],
    options: [{
        name: 'Create three main folders',
        online: true,
        pathway: true,
        campus: false
    },
    {
        name: 'Move files into three main folders',
        online: true,
        pathway: true,
        campus: false
    },
    {
        name: 'Create Archive',
        online: false,
        pathway: false,
        campus: false
    },
    {
        name: 'Archive unused files',
        online: false,
        pathway: false,
        campus: false
    },
    {
        name: 'Delete unused files',
        online: true,
        pathway: true,
        campus: false
    }
    ]
}, {
    name: 'set-navigation-tabs',
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'required'
    },
    description: 'Sets the navigation tabs in Canvas to the standard.',
    requiredModules: [],
    options: []
}, {
    name: 'create-homepage',
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'default'
    },
    description: 'Creates the course homepage and inserts the template.',
    requiredModules: [],
    options: [{
        type: 'radio',
        platform: 'campus',
        name: 'campusTemplate',
        default: 'Basic',
        choices: [
            'Basic',
            'Basic Details',
            'Lg Ends Details',
            'Lg Ends Plain',
            'Modules',
            'Other',
            'Full Pictures',
            'Schedule',
            'Small Pictures',
            'Sm Weeks Auto',
            'Syllabus',
            'Weeks Auto'
        ]
    }]
}, {
    name: 'course-settings',
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'required'
    },
    description: 'Sets the course settings to the standards for each respective platform.',
    requiredModules: [],
    options: [{
        type: 'input',
        platform: 'campus',
        name: 'term',
        message: 'Enrollment Term:',
        validate: (input) => {
            return /(?:(?:Winter)|(?:Fall)|(?:Spring)|(?:Summer))\s\d{2}$/.test(input) || input === undefined;
        }
    }]
}, {
    name: 'assignment-categories',
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'default'
    },
    description: 'Verifies that weighted gradebooks (if chosen) add up to 100%.',
    requiredModules: [],
    options: []
}, {
    name: 'course-description',
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'disabled',
        campus: 'required'
    },
    description: 'Retrieves the course description from byui.edu (does not work for pathway)',
    requiredModules: [],
    options: []
}, {
    name: 'set-syllabus',
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'default'
    },
    description: 'Finds the syllabus and moves its contents to the Syllabus tab in Canvas.',
    requiredModules: [],
    options: []
}, {
    name: 'groups-bridge',
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'required'
    },
    description: 'Copies groups and group settings over from D2L.',
    requiredModules: [],
    options: []
}, {
    name: 'disperse-welcome-folder',
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'disabled'
    },
    description: 'Identifies the welcome folder and moves its contents elsewhere. Removes the welcome folder.',
    requiredModules: [],
    options: []
}, {
    name: 'setup-instructor-resources',
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'disabled'
    },
    description: 'Creates the instructor resources module and moves the appropriate content into it. Removes any "Resources" modules.',
    requiredModules: [],
    options: []
}, {
    name: 'icebreaker-discussion',
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'disabled'
    },
    description: 'Creates an icebreaker discussion board (renames existing ones).',
    requiredModules: [],
    options: []
}, {
    name: 'generate-headers',
    type: 'postImport',
    platform: {
        online: 'optional',
        pathway: 'optional',
        campus: 'disabled'
    },
    description: 'Generates subheaders for "beginning of week", "middle of week", and "end of week" in each week module.',
    requiredModules: [],
    options: []
}, {
    name: 'question-count',
    type: 'postImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Identifies all quizzes that have a different number of questions in Brightspace than in D2L.',
    requiredModules: [],
    options: []
}, {
    name: 'add-course-maintenance-log',
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'disabled'
    },
    description: 'Creates a maintenance log LTI link in Instructor Resources.',
    requiredModules: [],
    options: []
}, {
    name: 'action-series-master',
    type: 'postImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Runs all grandchildren.',
    requiredModules: [],
    options: []
}, {
    name: 'pin-discussion-boards',
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'required'
    },
    description: 'Pins all discussion boards in order, so they stay in order.',
    requiredModules: [],
    options: []
}, {
    name: 'textbook-access',
    type: 'postImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Creates a module called "Textbook Access."',
    requiredModules: [],
    options: []
}, {
    name: 'campus-standard-modules',
    type: 'postImport',
    platform: {
        online: 'disabled',
        pathway: 'disabled',
        campus: 'required'
    },
    description: 'Creates "Additional Resources" & "Teacher Resources" modules',
    requiredModules: [],
    options: []
}, {
    name: 'create-feedback-module-items',
    type: 'postImport',
    platform: {
        online: 'required',
        pathway: 'disabled',
        campus: 'disabled'
    },
    description: 'Creates W05 Student Feedback to Instructor, W12 Student Feedback to Instructor, and  W13 End-of-Course Evaluation.',
    requiredModules: [],
    options: []
}, {
    name: 'run-link-validator', // RUN AT END
    type: 'postImport',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Start the Canvas link validation tool',
    requiredModules: [],
    options: []
}, {
    name: 'blueprint-lock-items', // RUN AT END
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'disabled'
    },
    description: 'Locks most items in the course, if course is a blueprint.',
    requiredModules: ['course-make-blueprint'],
    options: []
}, {
    name: 'course-make-backup', // RUN AT END
    type: 'postImport',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'disabled'
    },
    description: 'If the course was turned into a blueprint course, this creates a backup that is synced to it.',
    requiredModules: ['course-make-blueprint'],
    options: []
}];

// NOTE - ACTION SERIES
module.exports.actionSeries = [{
    name: 'universal-styling-div',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Adds the needed "byui" div with the right classes for styling to take effect.',
    requiredModules: [],
    options: []
}, {
    name: 'universal-html-deprecated-tags',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Removes any deprecated HTML elements that use now-unused IDs.',
    requiredModules: [],
    options: []
}, {
    name: 'universal-rename',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Renames items from old standard names to new standard names.',
    requiredModules: [],
    options: []
}, {
    name: 'universal-references',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Identifies references to outdated resources.',
    requiredModules: [],
    options: []
}, {
    name: 'universal-target-attributes',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Sets all external links to open in a new tab.',
    requiredModules: [],
    options: []
}, {
    name: 'universal-alt-attribute',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Identifies all alt attributes that are missing text or do not exist.',
    requiredModules: [],
    options: []
}, {
    name: 'universal-set-external-links',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Sets external link module items from old URLs to new URLs.',
    requiredModules: [],
    options: []
}, {
    name: 'universal-err-links',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Identifies ERR URLs.',
    requiredModules: [],
    options: []
}, {
    name: 'universal-remove-banners',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Removes banners from everything except overview pages.',
    requiredModules: [],
    options: []
}, {
    name: 'universal-fix-dropbox-links',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Attempts to fix as many dropbox links as possible, which currently break on import.',
    requiredModules: [],
    options: []
}, {
    name: 'universal-html-replace-tags',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Replaces "i" tags with "em" tags, and "b" tags with "strong" tags.',
    requiredModules: [],
    options: []
}, {
    name: 'universal-description-quicklinks',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Attempts to fix broken quicklinks found in item descriptions.',
    requiredModules: [],
    options: []
}, {
    name: 'universal-html-empty-tags',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Removes empty HTML elements from the course.',
    requiredModules: [],
    options: []
}, {
    name: 'universal-table-classes',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Adds the standard classes to tables within HTML in the course.',
    requiredModules: [],
    options: []
}, {
    name: 'assignments-delete',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Deletes unneeded assignments.',
    requiredModules: [],
    options: []
}, {
    name: 'discussions-delete',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Deletes unneeded discussions.',
    requiredModules: [],
    options: []
}, {
    name: 'files-delete',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Deletes unneeded files.',
    requiredModules: [],
    options: []
},
/* {
    name: 'files-move',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'optional'
    },
    description: 'Moves files into the newly created documents, media, and template folders.',
    requiredModules: ['reorganize-file-structure'],
    options: []
} */
{
    name: 'files-naming-conventions',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Renames files according to the Online Learning naming conventions.',
    requiredModules: [],
    options: []
}, {
    name: 'files-report-videos',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Identifies video files being stored in the course.',
    requiredModules: [],
    options: []
}, {
    name: 'module-items-delete',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Deletes unneeded module items.',
    requiredModules: [],
    options: []
}, {
    name: 'module-items-external-urls',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Sets module item external URLS to new ones.',
    requiredModules: [],
    options: []
}, {
    name: 'module-items-naming-conventions',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Sets module item names to the Online Learning naming conventions.',
    requiredModules: [],
    options: []
}, {
    name: 'module-items-position',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Sets module item positions for specific items.',
    requiredModules: [],
    options: []
}, {
    name: 'module-items-publish-settings',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Sets whether certain module items are published or not.',
    requiredModules: [],
    options: []
}, {
    name: 'module-items-requirements',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Provides each module item with a requirement.',
    requiredModules: [],
    options: []
}, {
    name: 'modules-delete',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Provides each module item with a requirement.',
    requiredModules: [],
    options: []
}, {
    name: 'modules-naming-conventions',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Renames modules based on online learning naming conventions.',
    requiredModules: [],
    options: []
}, {
    name: 'modules-publish-settings',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: 'Handles module publish settings.',
    requiredModules: [],
    options: []
}, {
    name: 'pages-delete',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: '',
    requiredModules: [],
    options: []
}, {
    name: 'pages-insert-template',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: '',
    requiredModules: [],
    options: []
}, {
    name: 'quiz-questions-delete',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: '',
    requiredModules: [],
    options: []
}, {
    name: 'quiz-questions-broken-quicklinks',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: '',
    requiredModules: [],
    options: []
}, {
    name: 'quiz-questions-match-swap',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: '',
    requiredModules: [],
    options: []
}, {
    name: 'quizzes-delete',
    type: 'actionSeries',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'disabled'
    },
    description: '',
    requiredModules: [],
    options: []
}
];

// NOTE - CLEANUP
module.exports.cleanUp = [{
    name: 'remove-files',
    type: 'cleanUp',
    platform: {
        online: 'default',
        pathway: 'default',
        campus: 'required'
    },
    description: 'Cleans up generated files from the conversion tool.',
    requiredModules: [],
    options: []
}, {
    name: 'delete-course',
    type: 'cleanUp',
    platform: {
        online: 'optional',
        pathway: 'optional',
        campus: 'required'
    },
    description: 'Deletes the course after running. Used in development only.',
    requiredModules: [],
    options: []
}, {
    name: './shellScripts/generateReports.js',
    type: 'cleanUp',
    platform: {
        online: 'required',
        pathway: 'required',
        campus: 'required'
    },
    description: 'Generates the HTML and JSON reports at the end.',
    requiredModules: [],
    options: []
}];