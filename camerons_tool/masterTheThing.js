var theThing = {
    "platform": "campus",
    "D2LOU": "[DYNAMIC-VARIABLE]",
    "canvasOU": "asdf",
    "preparation": [],
    "preImport": [],
    "import": [
        "create-course"
    ],
    "postImport": [
        "create-homepage",
        "assignment-categories",
        "set-syllabus"
    ],
    "actionSeries": [],
    "cleanUp": [],
    "options": [
        {
            "name": "campusTemplate",
            "value": "Basic"
        },
        {
            "name": "term",
            "value": "Fall 19"
        }
    ],
    "campusTemplate": "Basic",
    "term": "Fall 19",
    "fullAgenda": [
        {
            "name": "create-course-object",
            "type": "preparation",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Creates the course object used by all other modules.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "set-file-paths",
            "type": "preparation",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Sets the file paths to various files, such as the course download.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "unzip",
            "type": "preparation",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Unzips the downloaded course.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "index-directory",
            "type": "preparation",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Indexes the downloaded, unzipped course and adds it to the Course object.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "course-has-content",
            "type": "preparation",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Ensures the course has content so it can upload without breaking",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "question-issues-report",
            "type": "preImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Identifies every question that will probably have issues after conversion.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "quiz-rel-cleaner",
            "type": "preImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Removes bad \"rel\" tags from quizzes.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "quiz-instructions",
            "type": "preImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Moves all quiz instructions to one place for each quiz, fixing the 500 internal server error issue with quizzes.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "report-html-tags",
            "type": "preImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Identifies any script and style tags that will be stripped on import by Canvas.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "find-quiz-regex",
            "type": "preImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Identifies regex answers within quizzes.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "mismatched-quiz-points",
            "type": "preImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Identifies quizzes that will have a different grade value in Canvas vs. D2L.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "random-sections-check",
            "type": "preImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Identifies random sections within quizzes.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "write-course",
            "type": "preImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "After edits are made, writes the entire course object back to the hard drive to be zipped for upload.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "zip",
            "type": "preImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Zips the course up for upload.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "create-course",
            "type": "import",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "optional"
            },
            "description": "Creates a new course in Canvas.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "upload-course",
            "type": "import",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Uploads the D2L course into the newly created Canvas course.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "./shellScripts/verifyCourseUpload.js",
            "type": "postImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Verifies that the entire course has finished unpacking.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "remove-dateless-events",
            "type": "postImport",
            "platform": {
                "online": "default",
                "pathway": "default",
                "campus": "required"
            },
            "description": "Deletes calendar event without start & end dates.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "files-find-used-content",
            "type": "postImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Identifies which files are used, and which are not.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "quiz-fix-overlay",
            "type": "postImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Fixes issues with certain quiz overlays not working correctly.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "quiz-time-limit",
            "type": "postImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Removes time limits from quizzes that shouldn't have them.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "campus-standard-modules",
            "type": "postImport",
            "platform": {
                "online": "disabled",
                "pathway": "disabled",
                "campus": "required"
            },
            "description": "Creates student resources and instructor resources if missing.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "set-navigation-tabs",
            "type": "postImport",
            "platform": {
                "online": "default",
                "pathway": "default",
                "campus": "required"
            },
            "description": "Sets the navigation tabs in Canvas to the standard.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "create-homepage",
            "type": "postImport",
            "platform": {
                "online": "default",
                "pathway": "default",
                "campus": "default"
            },
            "description": "Creates the course homepage and inserts the template.",
            "requiredModules": [],
            "options": [
                {
                    "type": "radio",
                    "platform": "campus",
                    "name": "campusTemplate",
                    "default": "Basic",
                    "choices": [
                        "Basic",
                        "Basic Details",
                        "Lg Ends Details",
                        "Lg Ends Plain",
                        "Modules",
                        "Other",
                        "Full Pictures",
                        "Schedule",
                        "Small Pictures",
                        "Sm Weeks Auto",
                        "Syllabus",
                        "Weeks Auto"
                    ]
                }
            ]
        },
        {
            "name": "course-settings",
            "type": "postImport",
            "platform": {
                "online": "default",
                "pathway": "default",
                "campus": "required"
            },
            "description": "Sets the course settings to the standards for each respective platform.",
            "requiredModules": [],
            "options": [
                {
                    "type": "input",
                    "platform": "campus",
                    "name": "term",
                    "message": "Enrollment Term:"
                }
            ]
        },
        {
            "name": "assignment-categories",
            "type": "postImport",
            "platform": {
                "online": "default",
                "pathway": "default",
                "campus": "default"
            },
            "description": "Verifies that weighted gradebooks (if chosen) add up to 100%.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "course-description",
            "type": "postImport",
            "platform": {
                "online": "default",
                "pathway": "disabled",
                "campus": "required"
            },
            "description": "Retrieves the course description from byui.edu (does not work for pathway)",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "set-syllabus",
            "type": "postImport",
            "platform": {
                "online": "default",
                "pathway": "default",
                "campus": "default"
            },
            "description": "Finds the syllabus and moves its contents to the Syllabus tab in Canvas.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "groups-bridge",
            "type": "postImport",
            "platform": {
                "online": "default",
                "pathway": "default",
                "campus": "required"
            },
            "description": "Copies groups and group settings over from D2L.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "question-count",
            "type": "postImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Identifies all quizzes that have a different number of questions in Brightspace than in D2L.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "action-series-master",
            "type": "postImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Runs all grandchildren.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "pin-discussion-boards",
            "type": "postImport",
            "platform": {
                "online": "default",
                "pathway": "default",
                "campus": "required"
            },
            "description": "Pins all discussion boards in order, so they stay in order.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "textbook-access",
            "type": "postImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Creates a module called \"Textbook Access.\"",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "campus-standard-modules",
            "type": "postImport",
            "platform": {
                "online": "disabled",
                "pathway": "disabled",
                "campus": "required"
            },
            "description": "Creates \"Additional Resources\" & \"Teacher Resources\" modules",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "run-link-validator",
            "type": "postImport",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Start the Canvas link validation tool",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "remove-files",
            "type": "cleanUp",
            "platform": {
                "online": "default",
                "pathway": "default",
                "campus": "required"
            },
            "description": "Cleans up generated files from the conversion tool.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "delete-course",
            "type": "cleanUp",
            "platform": {
                "online": "optional",
                "pathway": "optional",
                "campus": "required"
            },
            "description": "Deletes the course after running. Used in development only.",
            "requiredModules": [],
            "options": []
        },
        {
            "name": "./shellScripts/generateReports.js",
            "type": "cleanUp",
            "platform": {
                "online": "required",
                "pathway": "required",
                "campus": "required"
            },
            "description": "Generates the HTML and JSON reports at the end.",
            "requiredModules": [],
            "options": []
        }
    ],
    "fullActionSeries": [
        "universal-styling-div",
        "universal-references",
        "universal-target-attributes",
        "universal-alt-attribute",
        "universal-err-links",
        "universal-fix-dropbox-links",
        "universal-html-replace-tags",
        "universal-description-quicklinks",
        "universal-html-empty-tags",
        "files-report-videos",
        "module-items-requirements",
        "quiz-questions-delete",
        "quiz-questions-broken-quicklinks",
        "quiz-questions-match-swap"
    ],
    "instructorName": "[DYNAMIC-VARIABLE]",
    "instructorEmail": "[DYNAMIC-VARIABLE]",
    "username": "[USER-VARIABLE]",
    "password": "[USER-VARIABLE]"
}