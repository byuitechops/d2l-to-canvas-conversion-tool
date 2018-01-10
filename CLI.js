/*eslint-env node, es6*/
/*eslint no-console:0*/

/* Any child modules listed here will run when conversion is ran through the CLI */
var childModules = [
    // 'reorganize-file-structure',
    // 'set-syllabus',
    // 'ilearn-3-references',
    // 'module-publish-settings',
    // 'create-homepage',
    // 'set-navigation-tabs',
    // 'target-attribute',
    // 'web-features-update'
];

const downloader = require('d2l-course-downloader'),
    prompt = require('prompt'),
    argv = require('yargs').argv,
    conversion = require('./newMain.js'),
    asyncLib = require('async'),
    chalk = require('chalk'),
    path = require('path'),
    fs = require('fs');

var settings = {
    'debug': argv.d || argv.D || argv.debug ? argv.d : false,
    'readAll': argv.a || argv.A || argv.all ? argv.a : false,
    'online': argv.o || argv.O || argv.online ? true : false,
    'keepFiles': argv.k || argv.K || argv.keep ? true : false,
    'deleteCourse': argv.x || argv.X || argv.delete ? true : false,
    'useDownloader': argv.e || argv.E || argv.existing ? false : true
};

var getOU = [{
    name: 'ous',
    type: 'string',
    description: chalk.cyanBright('Enter the OU(s) you want to convert:'),
    required: true,
    message: 'OU(s) cannot be empty.'
}];

function readFile() {
    fs.readdir(path.resolve('.', 'D2LOriginal/'), (err, dirContents) => {
        var zips = dirContents.filter((zip) => {
            if (zip.includes('.zip'))
                return true;
        }).map((zip) => {
            return {
                'settings': settings,
                'courseInfo': {
                    'path': path.resolve('.', 'D2LOriginal/', zip),
                    'D2LOU': 'Unavailable'
                }
            }
        });
        if (zips.length == 0) {
            console.log('No zips found in D2LOriginal folder.');
        } else {
            console.log(`Performing conversion process on ${zips.length} course(s):`);
            zips.forEach(zip => {
                console.log(path.basename(zip.courseInfo.path, '.zip'));
            });
        }
        startConversion(zips);
    });
}

function startConversion(courses) {
    courses.forEach(course => {
        course.courseInfo.childModules = childModules;
    });
    asyncLib.eachSeries(courses, conversion, (err, resultCourses) => {
        if (err) {
            console.log(chalk.red('\nError writing report to report.json'));
        }
    });
}

if (settings.existing === true) {
    settings.keepFiles = true;
}

if (settings.useDownloader === false) {
    readFile();
} else {
    prompt.get(getOU, (err, result) => {
        var userData = {
            ous: [result.ous],
            downloadLocation: './D2LOriginal',
        };
    
        downloader(userData, (downloadError, downloaderResults) => {
            if (downloadError) console.error(downloadError);
            else {
                /* Convert list of results to a list of paths */
                var courses = downloaderResults.map((downloaderResult) => {
                    return {
                        'settings': settings,
                        'courseInfo': {
                            'path': downloaderResult.name,
                            'D2LOU': downloaderResult.ou
                        }
                    };
                });
                startConversion(courses);
            }
        });
    
    });
}

