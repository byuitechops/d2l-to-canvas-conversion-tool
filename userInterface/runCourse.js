
const downloader = require('d2l-course-downloader'),
    conversion = require('../main.js'),
    asyncLib = require('async'),
    chalk = require('chalk'),
    path = require('path'),
    fs = require('fs');

var childModules = [];

function startConversion(courses) {
    courses.forEach((course, index) => {
        course.childModules = childModules;
    });
    asyncLib.eachSeries(courses, conversion, (err, resultCourses) => {
        if (err) {
            console.log(chalk.red('\nError writing report to report.json'));
        }
    })
}

/* Read in the JSON file with the information we need from the UI */
fs.readFile('./userInterface/tmp.json', 'utf8', (err, data) => {
    var userData = JSON.parse(data);
    childModules = userData.childModules;
    userData.downloadLocation = './D2LOriginal';
    fs.unlink('./userInterface/tmp.json', unlinkErr => {
        if (unlinkErr) console.error(unlinkErr);
        else {
            if (err) console.error(err);
            else {
                downloader(userData, (error, resultCourses) => {
                    if (error) console.error(error);
                    else {
                        var courses = resultCourses.map(course => {
                            return {
                                "settings": userData.settings,
                                "path": course.name
                            };
                        });
                        startConversion(courses);
                    }
                });
            }
        }
    });
});
