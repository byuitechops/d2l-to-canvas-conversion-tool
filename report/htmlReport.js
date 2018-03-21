const asyncLib = require('async');
const fs = require('fs');
const buildHTML = require('./buildHTML.js');
const htmlTemplate = require('./HTMLtemplate.js');

module.exports = (course, callback) => {

    if (course == null) {
        course = {
            logs: JSON.parse(fs.readFileSync('../reports/reportConversion Test Gauntlet 1.json')),
            info: {
                D2LOU: 12345,
                canvasOU: 12345,
                fileName: 'potato.zip'
            }
        };
    }

    var logsObject = {
        'fatalError': [],
        'error': [],
        'warning': [],
        'message': [],
    };

    course.logs.forEach(log => {
        if (!logsObject[log.title]) {
            logsObject[log.title] = [];
        } else {
            logsObject[log.title].push(log);
        }
    });

    asyncLib.mapSeries(logsObject, buildHTML, (err, htmlCategories) => {
        if (err) {
            course.error(err);
            callback(null, course);
            return;
        }

        /* generate template guts */
        var templateGuts = htmlCategories.join(''); // idk if joining on a newline will really work...

        course.info.htmlReportGuts = templateGuts;

        var html = htmlTemplate(course);

        /* write the report */
        fs.writeFile(`./reports/report${course.info.fileName.split('.zip')[0]}.html`, html, writeErr => {
            if (writeErr) course.error(writeErr);
            callback(null, course);
        });
    });
};