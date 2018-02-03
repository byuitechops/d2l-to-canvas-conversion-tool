/* eslint no-console:0 */

const chalk = require('chalk');
const fws = require('fixed-width-string');

module.exports = (course, callback) => {

    var errors = course.logs.filter(log => log.title == 'error');
    var fatalErrors = course.logs.filter(log => log.title == 'fatalError');
    var warnings = course.logs.filter(log => log.title == 'warning');

    console.log(`\nNew Canvas Course: https://byui.instructure.com/courses/${course.info.canvasOU}`);
    if (course.info.prototypeOU)
        console.log(`\nCopy of Original Course: https://byui.instructure.com/courses/${course.info.prototypeOU}`);

    console.log('\n' + chalk.bgBlue(' FINAL REPORT '));

    console.log(chalk.redBright(fws('ERRORS:', 14) + errors.length));
    // errors.forEach(error => {
    //     console.log(chalk.cyan(fws(error.location, 15)), error.data);
    // });

    console.log(chalk.red(fws('FATAL ERRORS:', 14) + fatalErrors.length));
    // fatalErrors.forEach(fatal => {
    //     console.log(chalk.cyan(fws(fatal.location, 15)), fatal.data);
    // });

    console.log(chalk.yellow(fws('WARNINGS:', 14) + warnings.length));
    // warnings.forEach(warning => {
    //     console.log(chalk.cyan(fws(warning.location, 15)), warning.data.message);
    // });

    callback(null, course);
};