/*eslint-env node, es6*/
/*eslint no-console:0*/

/* DEPENDENCIES */
const async = require('async');
const verify = require('course-object-verifier');
const insertFunction = require('./insertFunction.js');
const chalk = require('chalk');
const fws = require('fixed-width-string');
const agenda = require('./agenda.js');
const cleanUp = require('./stepModules/cleanUp.js');
const fs = require('fs');

module.exports = (settings, finalCallback) => {

    /* STEP MODULES ARRAY */
    /* This array is where each step module's function is stored
    for the async waterfall below. Each of these functions contains
    a main step in the process of converting a course.*/

    var stepModules = [
      async.constant(settings.path, settings.settings),
      ...agenda.main
    ];

    stepModules = insertFunction(stepModules, verify);

    function finalReport(courseObj) {
        console.log(`\nNew Canvas Course: https://byui.instructure.com/courses/${courseObj.info.canvasOU}`);
        console.log('\n' + chalk.bgBlue(' FINAL REPORT '));

        console.log(
            fws(chalk.cyanBright('MODULE'), 13),
            fws(chalk.yellow('WARNINGS'), 10, { align: 'right' }),
            fws(chalk.red('ERRORS'), 10, { align: 'right' }),
            fws(chalk.redBright('FATALERRS'), 10, { align: 'right' }),
            fws(chalk.greenBright('SUCCESSES'), 10, { align: 'right' })
        );

        courseObj.report.forEach(report => {
            console.log(
                fws(chalk.cyan(report.name), 13),
                fws(chalk.yellow(report.warnings.length), 10, { align: 'right' }),
                fws(chalk.red(report.errors.length), 10, { align: 'right' }),
                fws(chalk.redBright(report.fatalErrs.length), 10, { align: 'right' }),
                fws(chalk.greenBright(report.changes.length), 10, { align: 'right' })
            );
        });

        fs.writeFile(`./report${course.info.fileName.split('.zip')[0]}.json`, JSON.stringify(finalCourse.report), err => {
            if (err){
                console.log(chalk.red('Error writing report to report.json'));
            } else {
                console.log('\nFinal report written to report.json');
            }
        });
    }

    /* Runs through each Step Module one by one */
    async.waterfall(stepModules, (err, resultCourse) => {
        /* Only fatal errors make it to this point.
         All others are just reported where they happen. */
        if (err) {
            if(resultCourse == undefined){
                console.error(new Error(`The result Course object is ${resultCourse}`));
                return;
            }
            console.error('The program crashed because of an error. Have a good day! :D');
            /* let deleteCourse know it needs to remove the course*/
            resultCourse.settings.deleteCourse = true;
            cleanUp(resultCourse, (cleanUpErr, finalCourse) => {
                if (cleanUpErr) {
                    finalCourse.throwFatalErr('main', cleanUpErr);
                }
                finalReport(finalCourse);
                finalCallback(err, finalCourse);
            });
        } else {
            cleanUp(resultCourse, (cleanUpErr, finalCourse) => {
                if (cleanUpErr) {
                    finalCourse.throwFatalErr('main', cleanUpErr);
                }
                finalCourse.success('cleanUp', 'Cleanup process complete');
                finalReport(finalCourse);
                finalCallback(null, finalCourse);
            });
        }
    });
}
