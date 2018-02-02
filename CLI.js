/*eslint-env node, es6*/
/*eslint no-console:0*/

/* Any child modules listed here will run when conversion is ran through the CLI */
var childModules = [
    // 'find-quiz-regex',
    'delete-duplicate-files',
    'delete-questions-and-conversations',
    'target-attribute',
    'question-issues-report',
    'check-alt-property',
    'disperse-welcome-folder', // REVIEW
    // 'match-question-answers', // REVIEW
    'setup-instructor-resources', // REVIEW
    // 'lessons-create-discussions', // REVIEW - will not check for existing
    // 'blueprint-lock-items', // Should run last, if possible
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
    'online': argv.o || argv.O || argv.online ? true : true, // TRUE IN BOTH CASES, MUST BE SWITCHED LATER
    'keepFiles': argv.k || argv.K || argv.keep ? true : false,
    'deleteCourse': argv.x || argv.X || argv.delete ? true : false,
    'useDownloader': argv.e || argv.E || argv.existing ? false : true,
    'lessonFolders': argv.l || argv.L || argv.lessonFolders ? true : false,
    'ouList': argv.g || argv.G || argv.ouList ? true : false,
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
},
{
    name: 'canvasOU',
    description: chalk.cyanBright('Do you have an existing Canvas OU?'),
    type: 'string',
    default: 'no',
    required: true
}
];

var getOU = [{
    name: 'ous',
    type: 'string',
    description: chalk.cyanBright('Enter the OU(s) you want to convert:'),
    required: true,
    message: 'OU(s) cannot be empty.',
    default: '340002'
}];

prompt.message = chalk.whiteBright('');
prompt.delimiter = chalk.whiteBright('');

function readFile(domainData) {
    fs.readdir(path.resolve('.', 'factory', 'originalZip'), (err, dirContents) => {
        var zips = dirContents.filter((zip) => {
            if (zip.includes('.zip'))
                return true;
        }).map((zip) => {
            return {
                'settings': settings,
                'courseInfo': {
                    'path': path.resolve('.', 'factory', 'originalZip', zip),
                    'D2LOU': 'Unavailable',
                    'canvasOU': domainData.canvasOU,
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
    asyncLib.eachSeries(courses, conversion, (err) => {
        if (err) {
            console.log(chalk.red('\nError writing report to report.json'));
        } else {
            if (courses.length != undefined) {
                console.log(chalk.blueBright(`${courses.length} courses have been converted.`));
            }
        }
    });
}

/* Get the domain from the user */
prompt.get(courseDomain, (errDomain, domainData) => {
    var ous, userData;

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
                            'D2LOU': downloaderResult.ou,
                            'canvasOU': domainData.canvasOU,
                        }
                    };
                });
                startConversion(courses, conversion);
            }
        });
    }

    if (errDomain) {
        console.log(errDomain);
        return;
    }

    /* If we we aren't using the downloader, skip the rest and keep the files */
    if (settings.useDownloader === false) {
        settings.keepFiles = true;
        readFile(domainData);

    } else if (settings.ouList === true) {
        /* Get the OUs from the ouList */
        ous = require('./ouList.js');
        userData = {
            ous: ous.split('\n'),
            downloadLocation: './factory/originalZip',
            domain: domainData.domain,
            // canvasOU: domainData.canvasOU,
        };

        startDownloader(conversion);

    } else {
        /* Get the OU from the user */
        prompt.get(getOU, (errPrompt, result) => {

            if (errPrompt) {
                console.log(errPrompt);
                return;
            }

            userData = {
                ous: [result.ous],
                downloadLocation: './factory/originalZip',
                domain: domainData.domain,
                canvasOU: domainData.canvasOU,
            };

            startDownloader(conversion);
        });
    }
});