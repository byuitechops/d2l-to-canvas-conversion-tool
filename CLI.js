#! /usr/bin/env node
const argv = require('yargs').argv;
const main = require('./main');
const chalk = require('chalk');
const fws = require('fixed-width-string');
const fs = require('fs');

var settings = {
    'debug': argv.D ? argv.D : false,
    'readAll': argv.A ? argv.A : false,
    'online': argv.campus ? false : true,
    'keepFiles': argv.K ? true : false
};

main(settings, (finalCourse) => {
    finalCourse.report.forEach((ReportModule) => {
      console.log(chalk.yellowBright(`\nModule Report: ${chalk.yellow(ReportModule.name)}\n`));
      console.log(fws(`Errors`, 20, {padding: '.'}) + chalk.red(ReportModule.errors.length));
      console.log(fws(`Fatal Errors`, 20, {padding: '.'}) + chalk.red(ReportModule.fatalErrs.length));
      console.log(fws(`Successes`, 20, {padding: '.'}) + chalk.greenBright(ReportModule.changes.length));
    });
    fs.writeFile('./report.json', JSON.stringify(finalCourse.report), err => {
        console.log('\nFinal report written to report.json');
    });
});
