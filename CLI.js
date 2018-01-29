/*eslint-env node, es6*/
/*eslint no-console:0*/

/* Any child modules listed here will run when conversion is ran through the CLI */
var childModules = [
    'reorganize-file-structure',
    'delete-duplicate-files',
    'set-syllabus',
    'ilearn-3-references',
    'module-publish-settings',
    'create-homepage',
    'set-navigation-tabs',
    'target-attribute',
    'web-features-update',
    'assignments-delete-unwanted',
    'question-issues-report',
    'blueprint-lock-items',
    'check-alt-property', 
    'disperse-welcome-folder', // REVIEW
    'match-question-answers', // REVIEW
    'setup-instructor-resources', // REVIEW
    'lessons-create-discussions', // REVIEW
];

const downloader = require('d2l-course-downloader'),
    prompt = require('prompt'),
    argv = require('yargs').argv,
    conversion = require('./main.js'),
    asyncLib = require('async'),
    chalk = require('chalk'),
    path = require('path'),
    fs = require('fs');

var settings = {
    'debug': argv.d || argv.D || argv.debug ? argv.d : false,
    'readAll': argv.a || argv.A || argv.all ? argv.a : false,
    'online': argv.o || argv.O || argv.online ? true : true,
    'keepFiles': argv.k || argv.K || argv.keep ? true : false,
    'deleteCourse': argv.x || argv.X || argv.delete ? true : false,
    'useDownloader': argv.e || argv.E || argv.existing ? false : true,
    'prototypeLesson': argv.p || argv.P || argv.prototype ? true : false,
};

var courseDomain = [{
    name: 'domain',
    description: chalk.cyanBright('Is this for Pathway?'),
    type: 'string',
    default: 'no',
    required: true,
    before: (value) => {
        if (value.toLowerCase() != 'yes' || value.toLowerCase() != 'y') {
            return 'byui';
        } else {
            return 'pathway';
        }
    }
}];

var getOU = [{
    name: 'ous',
    type: 'string',
    description: chalk.cyanBright('Enter the OU(s) you want to convert:'),
    required: true,
    message: 'OU(s) cannot be empty.',
    default: '340002'
}];

var getLessonTitle = [{
    name: 'lessonTitle',
    type: 'string',
    description: chalk.cyanBright('Enter the Lesson Title you want to convert:'),
    required: true,
    message: 'Lesson Title cannot be empty.',
    default: 'Child 10: I-Learn 3 References'
}];

prompt.message = chalk.whiteBright('');
prompt.delimiter = chalk.whiteBright('');

function readFile() {
    fs.readdir(path.resolve('.', 'factory', 'originalZip'), (err, dirContents) => {
        var zips = dirContents.filter((zip) => {
            if (zip.includes('.zip'))
                return true;
        }).map((zip) => {
            return {
                'settings': settings,
                'courseInfo': {
                    'path': path.resolve('.', 'factory', 'originalZip', zip),
                    'D2LOU': 'Unavailable'
                }
            };
        });
        if (zips.length == 0) {
            console.log('No zips found in originalZip folder.');
        } else {
            console.log(`Performing conversion process on ${zips.length} course(s):`);
            zips.forEach(zip => {
                console.log(path.basename(zip.courseInfo.path, '.zip'));
            });
        }
        startConversion(zips, conversion);
    });
}

function startConversion(courses, conversion) {
    courses.forEach(course => {
        course.courseInfo.childModules = childModules;
    });
    asyncLib.eachSeries(courses, conversion, (err, resultCourses) => {
        if (err) {
            console.log(chalk.red('\nError writing report to report.json'));
        } else {
            // console.log(chalk.blueBright(`${resultCourses.length} courses have been converted.`));
        }
    });
}

/* Get the domain from the user */
prompt.get(courseDomain, (errDomain, domainData) => {
    if (errDomain) {
        console.log(errDomain);
        return;
    }

    /* If we we aren't using the downloader, skip the rest and keep the files */
    if (settings.useDownloader === false) {
        settings.keepFiles = true;
        readFile();
    } else {
        /* Get the OU from the user */
        prompt.get(getOU, (errPrompt, result) => {

            var userData = {
                ous: [result.ous],
                downloadLocation: './factory/originalZip',
                domain: domainData.domain,
            };

            if (errPrompt) {
                console.log(errPrompt);
                return;
            }

            /* Run the downloader */
            function startDownloader(conversion) {
                downloader(userData, (downloadError, downloaderResults) => {
                    var courses;
                    if (downloadError) console.error(downloadError);
                    else {
                        /* Convert list of results to a list of paths */
                        courses = downloaderResults.map((downloaderResult) => {
                            return {
                                'settings': settings,
                                'courseInfo': {
                                    'path': downloaderResult.name,
                                    'D2LOU': downloaderResult.ou
                                }
                            };
                        });
                        startConversion(courses, conversion);
                    }
                });
            }

            /* If we only want one lesson in the download... */
            if (settings.prototypeLesson) {
                prompt.get(getLessonTitle, (err, promptData) => {
                    userData.lessonTitle = promptData.lessonTitle;
                    startDownloader(prototype);
                });
            } else {
                startDownloader(conversion);
            }
        });
    }
});



