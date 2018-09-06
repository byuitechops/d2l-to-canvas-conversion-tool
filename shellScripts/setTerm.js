/* eslint no-console:0 */

/*******************************************************
 * Used to set the term on a large number of courses. 
 * Takes a csv of courses (courseListName). The new term is specified by
 * ID (newTerm)
 ******************************************************/

/* Libraries */
const canvas = require('canvas-wrapper'),
    asyncLib = require('async'),
    fs = require('fs'),
    chalk = require('chalk'),
    d3 = require('d3-dsv');

/* Settings */
const courseListName = '',
    newTerm = 21; // Winter 2019. use https://byui.instructure.com/api/v1/accounts/1/terms to get term ID's

function changeTerm(course, cb) {
    var postObj = {
        'course[term_id]': newTerm
    };

    canvas.put(`/api/v1/courses/${course.courseCode}`, postObj, (err, courseSettings) => {
        if (err) {
            cb(err);
            return;
        }
        // console.log('course settings', courseSettings);

        if (courseSettings.enrollment_term_id == newTerm)
            console.log(chalk.green('Successfully updated course:'), course.cardName, `https://byui.instructure.com/courses/${course.courseCode}/settings`);
        else
            console.log(chalk.red('Unable to update course:'), course.cardName, `https://byui.instructure.com/courses/${course.courseCode}/settings`);

        cb(null);
    });
}

function main() {
    fs.readFile(courseListName, (err, fileGuts) => {
        if (err) {
            console.error(chalk.red(err));
            return;
        }
        var courseOUs = d3.csvParse(fileGuts.toString());
        // console.log(courseOUs);

        asyncLib.eachLimit(courseOUs, 5, changeTerm, err => {
            if (err) {
                console.error(chalk.red(err));
                return;
            }

            console.log(chalk.blue('Done!'));
        });
    });
}

main();