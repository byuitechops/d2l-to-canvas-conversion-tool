/* eslint no-console:1 */

const asyncLib = require('async');
const fs = require('fs');
const getHTML = require('./someFile.js');
const htmlTemplate = require('./htmlTemplate.js');

module.exports = (course, callback) => {
    // probably shouldn't split these into separate arrays
    var errors = [],
        warnings = [],
        fatalErrs = [],
        logs = [],
        logCategories = [];

    /* split logs into specific categories */
    course.logs.forEach(log => {
        if (log.title == 'error') errors.push(log);
        else if (log.title == 'fatalError') fatalErrs.push(log);
        else if (log.title == 'warning') warnings.push(log);
        else {
            logs.push(log);

            if (!logCategories.includes(log.title))
                logCategories.push(log.title);
        }
    });

    /* turn logCategories into an array of log objects */
    logCategories = logCategories.map(category => {
        return logs.filter(log => {
            return category === log.title;
        });
    });

    /* select the order the report appears in. */
    logCategories = [...fatalErrs, ...errors, ...warnings, ...logCategories];

    asyncLib.mapSeries(logCategories, getHTML, (err, htmlCategories) => {
        if (err) {
            console.error(err);
            callback(null, course);
            return;
        }

        /* generate template guts */
        var templateGuts = htmlCategories.join('\n'); // idk if joining on a newline will really work...
        htmlTemplate.replace('REPLACE ME', templateGuts);
       
        /* write the report */
        fs.writeFile(`./reports/report${course.info.fileName.split('.zip')[0]}.html`, htmlTemplate, writeErr => {
            if (writeErr) console.error(writeErr);
            callback(null, course);
        });
    });
};