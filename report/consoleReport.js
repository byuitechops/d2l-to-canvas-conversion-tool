const fs = require('fs');
const chalk = require('chalk');
const fws = require('fixed-width-string');

module.exports = (course, callback) => {
    console.log(`\nNew Canvas Course: https://byui.instructure.com/courses/${course.info.canvasOU}`);

    console.log('\n' + chalk.bgBlue(' FINAL REPORT '));

    var errors = course.logs.filter(log => log.title == 'error');
    var fatalErrors = course.logs.filter(log => log.title == 'fatalError');
    var warnings = course.logs.filter(log => log.title == 'warning');

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

    console.log(...course.logs.map(log => log.title));

    callback(null, course);
}
